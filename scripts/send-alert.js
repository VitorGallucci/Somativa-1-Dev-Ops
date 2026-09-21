/**
 * Script de notificacao para Microsoft Teams e Discord
 * Disparado via GitHub Actions em eventos de push ou merge na branch main.
 */

async function sendTeamsAlert(webhookUrl, context) {
  const isPowerAutomate = webhookUrl.includes('logic.azure.com') || webhookUrl.includes('powerautomate');

  let payload;

  if (isPowerAutomate) {
    // Formato Adaptive Card para Teams moderno (Workflows / Power Automate)
    payload = {
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            type: 'AdaptiveCard',
            version: '1.4',
            body: [
              {
                type: 'TextBlock',
                text: '📢 Alerta de DevOps: Novo Push / Merge no Repositório',
                weight: 'Bolder',
                size: 'Medium',
                color: 'Accent'
              },
              {
                type: 'FactSet',
                facts: [
                  { title: 'Repositório:', value: context.repository },
                  { title: 'Branch:', value: context.refName },
                  { title: 'Autor:', value: context.actor },
                  { title: 'Commit:', value: context.sha.substring(0, 7) },
                  { title: 'Mensagem:', value: context.commitMessage || 'N/A' },
                  { title: 'Status CI/CD:', value: '✅ Sucesso' }
                ]
              }
            ],
            actions: [
              {
                type: 'Action.OpenUrl',
                title: 'Ver no GitHub',
                url: context.commitUrl
              }
            ]
          }
        }
      ]
    };
  } else {
    // Formato MessageCard para Teams classico (Incoming Webhook / Connectors)
    payload = {
      '@type': 'MessageCard',
      '@context': 'https://schema.org/extensions',
      summary: `Alerta DevOps: Push na branch ${context.refName}`,
      themeColor: '0078D7',
      title: '🚀 Alerta de DevOps - GitHub Actions',
      sections: [
        {
          activityTitle: `Push / Merge realizado na branch ${context.refName}`,
          activitySubtitle: `Repositório: ${context.repository}`,
          facts: [
            { name: 'Autor:', value: context.actor },
            { name: 'Branch:', value: context.refName },
            { name: 'Commit:', value: context.sha.substring(0, 7) },
            { name: 'Mensagem:', value: context.commitMessage || 'N/A' },
            { name: 'Status CI/CD:', value: '✅ Sucesso' }
          ]
        }
      ],
      potentialAction: [
        {
          '@type': 'OpenUri',
          name: 'Ver no GitHub',
          targets: [{ os: 'default', uri: context.commitUrl }]
        }
      ]
    };
  }

  console.log('Enviando alerta para o Microsoft Teams...');
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Falha no webhook do Teams (HTTP ${res.status}): ${errorText}`);
  }

  console.log('✅ Alerta enviado com sucesso para o Microsoft Teams!');
}

async function sendDiscordAlert(webhookUrl, context) {
  const payload = {
    username: 'DevOps Bot (GitHub Actions)',
    avatar_url: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    embeds: [
      {
        title: '🚀 Alerta de DevOps: Push / Merge no GitHub',
        url: context.commitUrl,
        color: 3447003, // Azul GitHub
        fields: [
          { name: 'Repositório', value: context.repository, inline: true },
          { name: 'Branch', value: context.refName, inline: true },
          { name: 'Autor', value: context.actor, inline: true },
          { name: 'Commit', value: `\`${context.sha.substring(0, 7)}\``, inline: true },
          { name: 'Status CI/CD', value: '✅ Aprovado', inline: true },
          { name: 'Mensagem', value: context.commitMessage || 'N/A' }
        ],
        footer: {
          text: 'GitHub Actions Alertas • Disciplina de DevOps'
        },
        timestamp: new Date().toISOString()
      }
    ]
  };

  console.log('Enviando alerta para o Discord...');
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Falha no webhook do Discord (HTTP ${res.status}): ${errorText}`);
  }

  console.log('✅ Alerta enviado com sucesso para o Discord!');
}

async function main() {
  const teamsWebhook = process.env.TEAMS_WEBHOOK_URL;
  const discordWebhook = process.env.DISCORD_WEBHOOK_URL;

  const context = {
    repository: process.env.GITHUB_REPOSITORY || 'VitorGallucci/Somativa-1-Dev-Ops',
    refName: process.env.GITHUB_REF_NAME || 'main',
    actor: process.env.GITHUB_ACTOR || 'VitorGallucci',
    sha: process.env.GITHUB_SHA || '0000000000000000000000000000000000000000',
    commitMessage: process.env.COMMIT_MESSAGE || 'Atualizacao no repositorio',
    commitUrl: process.env.COMMIT_URL || `https://github.com/${process.env.GITHUB_REPOSITORY || 'VitorGallucci/Somativa-1-Dev-Ops'}`
  };

  if (!teamsWebhook && !discordWebhook) {
    console.log('::warning::Nenhum webhook configurado!');
    console.log('Para receber alertas no Microsoft Teams ou Discord, configure a secret:');
    console.log('  - TEAMS_WEBHOOK_URL (para Microsoft Teams)');
    console.log('  - ou DISCORD_WEBHOOK_URL (para Discord)');
    console.log('no GitHub em: Settings > Secrets and variables > Actions');
    return;
  }

  if (teamsWebhook) {
    try {
      await sendTeamsAlert(teamsWebhook, context);
    } catch (err) {
      console.error('Erro ao notificar Teams:', err.message);
      process.exitCode = 1;
    }
  }

  if (discordWebhook) {
    try {
      await sendDiscordAlert(discordWebhook, context);
    } catch (err) {
      console.error('Erro ao notificar Discord:', err.message);
      process.exitCode = 1;
    }
  }
}

main();
