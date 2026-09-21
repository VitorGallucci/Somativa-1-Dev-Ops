# DevOps: Calculadora API, CI/CD Pipeline, Docker & Alertas

[![Continuous Integration (CI)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml)
[![Continuous Delivery (CD)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml)

Projeto prático desenvolvido para a disciplina de **DevOps**.

Este repositório implementa um fluxo completo de **Integração Contínua (CI)**, **Entrega/Deploy Contínuo (CD)**, **Dockerização** da aplicação e **Notificações automáticas de alertas** no **Microsoft Teams** (com suporte a Discord).

---

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v20+ e v22+)
- **Containerização:** [Docker](https://www.docker.com/) (imagem base `node:22-alpine`)
- **Protocolo:** HTTP / REST
- **Test Runner & Assertions:** `node:test` e `node:assert/strict` (nativos do Node.js)
- **CI/CD & Automação:** GitHub Actions
- **Alertas & Notificações:** Microsoft Teams (Adaptive Card / MessageCard) e Discord (Webhooks)
- **Controle de Versão:** Git & GitHub

---

## 📁 Estrutura de Diretórios

```text
├── .github/
│   └── workflows/
│       ├── ci.yml            # Pipeline de Integracao Continua (CI e Docker build test)
│       ├── cd.yml            # Pipeline de Entrega/Deploy Continuo (CD)
│       └── alertas-teams.yml # Workflow de disparo de alertas para Microsoft Teams
├── scripts/
│   └── send-alert.js         # Script de formatacao e envio do webhook de alertas
├── src/
│   ├── app.js                # Roteamento e manipulador de requisicoes HTTP
│   ├── calculator.js         # Regras de negocio e funcoes aritmeticas
│   └── server.js             # Ponto de entrada e inicializacao do servidor
├── test/
│   ├── api.test.js           # Testes de integracao das rotas HTTP
│   └── calculator.test.js    # Testes unitarios do modulo de calculos
├── .dockerignore             # Arquivos excluidos do contexto do Docker
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── Dockerfile                # Definicao da imagem Docker do projeto
├── package.json              # Configuracoes, scripts e metadados
└── README.md                 # Documentacao completa da aplicacao
```

---

## 🔔 Alertas e Notificações (Microsoft Teams)

O projeto possui integração com o **Microsoft Teams** (e **Discord**) via GitHub Actions para notificar commits e merges na branch `main`.

### Workflow: `.github/workflows/alertas-teams.yml`
- **Gatilhos:** Executado automaticamente a cada `push` ou `merge` na branch `main` e manualmente via `workflow_dispatch`.
- **Payload:** Envia um cartão interativo contendo autor, repositório, branch, hash do commit, mensagem e link direto para visualização no GitHub.

### Como Configurar o Webhook no Microsoft Teams:
1. No Microsoft Teams, abra ou crie um canal (ex: `DevOps-Alertas`).
2. Clique nas reticências (`...`) ao lado do nome do canal e selecione **Workflows** (ou **Conectores** se no Teams clássico).
3. Pesquise por **"Post to a channel when a webhook request is received"** (ou "Webhook de Entrada / Incoming Webhook").
4. Avance e copie o link do Webhook gerado.
5. No GitHub, acesse seu repositório:
   - **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.
   - Nome: `TEAMS_WEBHOOK_URL`
   - Valor: cole a URL copiada do Microsoft Teams.

*(Alternativamente, se desejar testar no Discord, basta criar a secret `DISCORD_WEBHOOK_URL`).*

---

## 🐳 Execução via Docker (Container)

A aplicação foi completamente dockerizada com foco em segurança (usuário não-root `node`), leveza (`node:22-alpine`) e resiliência (`HEALTHCHECK` embutido).

### 1. Construir a Imagem Docker
```bash
docker build -t somativa-devops-api:latest .
```

### 2. Iniciar o Container
```bash
docker run -d --name calculadora-app -p 3000:3000 somativa-devops-api:latest
```

### 3. Verificar o Status do Container
```bash
docker ps
```

---

## 🔄 Fluxo de CI/CD (GitHub Actions)

### 1. Continuous Integration (CI) - `.github/workflows/ci.yml`
- Validação estática de sintaxe e estilo (`npm run lint`).
- Matriz de testes automatizados com Node.js 20.x e 22.x (`npm test`).
- Teste de build da imagem Docker (`docker/build-push-action`).

### 2. Continuous Delivery / Deployment (CD) - `.github/workflows/cd.yml`
- Empacotamento do pacote de release (`dist/app-release-<sha>.tar.gz`).
- Smoke Test & Validação de Deploy com inicialização do servidor e checagem de rotas de saúde.
- Upload do artefato para download via `actions/upload-artifact@v4`.

---

## 🛠️ Como Executar Localmente (Sem Docker)

```bash
npm start
```

---

## 🧪 Testes Automatizados

```bash
npm run lint  # Verificacao estatica de sintaxe
npm test      # 18 testes unitarios e de integracao
```
