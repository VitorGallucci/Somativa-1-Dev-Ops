# Somativa 1 - DevOps: Calculadora API & CI/CD Pipeline

Projeto prático desenvolvido para a atividade **Somativa 1** da disciplina de **DevOps**.

Este repositório foi construído seguindo as boas práticas de desenvolvimento de software e cultura DevOps, incluindo versionamento semântico, desenvolvimento guiado em branch de feature, commits atômicos, suíte de testes automatizados e integração contínua via Pull Request.

---

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v20+)
- **Protocolo:** HTTP / REST
- **Test Runner & Assertions:** `node:test` e `node:assert/strict` (nativos do Node.js, sem dependências externas)
- **Controle de Versão:** Git & GitHub

> **Nota de Arquitetura DevOps:** O projeto foi arquitetado utilizando os módulos nativos do Node.js para garantir execução de testes em milissegundos e pipeline de CI/CD sem gargalos ou riscos de quebra de pacotes externos.

---

## 📁 Estrutura de Diretórios

```text
├── src/
│   ├── app.js         # Roteamento e manipulador de requisicoes HTTP
│   ├── calculator.js  # Regras de negocio e funcoes aritmeticas
│   └── server.js      # Ponto de entrada e inicializacao do servidor
├── test/
│   ├── api.test.js    # Testes de integracao das rotas HTTP
│   └── calculator.test.js # Testes unitarios do modulo de calculos
├── .gitignore         # Arquivos e pastas ignorados pelo Git
├── package.json       # Configuracoes e scripts do projeto
└── README.md          # Documentacao completa da aplicacao
```

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (v18+)

### Iniciar o Servidor
```bash
npm start
```
O servidor será iniciado na porta padrão `3000` (ou na porta definida pela variável de ambiente `PORT`).

---

## 🧪 Como Executar os Testes Automatizados

Para rodar todos os testes unitários e de integração:
```bash
npm test
```

A suíte executará:
- **18 testes** cobrindo operações matemáticas, casos de exceção (divisão por zero, tipos inválidos) e rotas HTTP da API (`/health`, `/api/info`, `/api/calculate`, 404).

---

## 📡 Endpoints da API

### 1. Healthcheck
- **Rota:** `GET /health`
- **Descrição:** Verifica se a aplicação está online e funcional.
- **Resposta:**
  ```json
  {
    "status": "UP",
    "uptime": 12.34,
    "timestamp": "2026-09-08T21:12:00.000Z"
  }
  ```

### 2. Informações da API
- **Rota:** `GET /api/info`
- **Descrição:** Retorna metadados da aplicação.

### 3. Execução de Cálculos
- **Rota:** `POST /api/calculate`
- **Exemplo de Body (JSON):**
  ```json
  {
    "operation": "add",
    "a": 10,
    "b": 20
  }
  ```
- **Operações suportadas:** `add`, `subtract`, `multiply`, `divide`, `power`, `factorial`.

---

## 🌿 Fluxo Git & DevOps Aplicado

1. **Repositório Remoto:** Conectado ao GitHub (`VitorGallucci/Somativa-1-Dev-Ops`).
2. **Branching Strategy:** Desenvolvimento isolado na branch `feature/calculadora-api`.
3. **Histórico de Commits:** Commits semânticos e incrementais cobrindo cada fase do ciclo de vida.
4. **Pull Request (PR):** Mesclagem de código via PR com validação da suíte de testes.
