# DevOps: Calculadora API & Pipeline de CI/CD Completo

[![Continuous Integration (CI)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml)
[![Continuous Delivery (CD)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml)

Projeto prático desenvolvido para a disciplina de **DevOps**.

Este repositório implementa um fluxo completo de **Integração Contínua (CI)** e **Entrega/Deploy Contínuo (CD)** utilizando **GitHub Actions**, com suíte de testes automatizados, verificação de qualidade de código, empacotamento de artefatos e testes de fumaça (smoke testing).

---

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v20+ e v22+)
- **Protocolo:** HTTP / REST
- **Test Runner & Assertions:** `node:test` e `node:assert/strict` (nativos do Node.js, sem dependências externas)
- **CI/CD:** GitHub Actions
- **Controle de Versão:** Git & GitHub

> **Nota de Arquitetura DevOps:** O projeto foi arquitetado utilizando os módulos nativos do Node.js para garantir execução de testes em milissegundos e pipeline de CI/CD sem gargalos ou riscos de quebra de pacotes externos.

---

## 📁 Estrutura de Diretórios

```text
├── .github/
│   └── workflows/
│       ├── ci.yml            # Pipeline de Integracao Continua (CI)
│       └── cd.yml            # Pipeline de Entrega/Deploy Continuo (CD)
├── src/
│   ├── app.js                # Roteamento e manipulador de requisicoes HTTP
│   ├── calculator.js         # Regras de negocio e funcoes aritmeticas
│   └── server.js             # Ponto de entrada e inicializacao do servidor
├── test/
│   ├── api.test.js           # Testes de integracao das rotas HTTP
│   └── calculator.test.js    # Testes unitarios do modulo de calculos
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── package.json              # Configuracoes, scripts e metadados
└── README.md                 # Documentacao completa da aplicacao
```

---

## 🔄 Fluxo de CI/CD (GitHub Actions)

O pipeline foi estruturado em dois workflows independentes e complementares:

### 1. Continuous Integration (CI) - `.github/workflows/ci.yml`
- **Gatilhos:** Disparado a cada `push` na branch `main` e em todas as `pull_request` direcionadas à `main`.
- **Estratégia de Matriz:** Executa em múltiplas versões do Node.js (`20.x` e `22.x`) sobre `ubuntu-latest`.
- **Etapas:**
  1. Checkout do código-fonte (`actions/checkout@v4`).
  2. Configuração do ambiente Node.js (`actions/setup-node@v4`).
  3. Verificação de sintaxe e qualidade (`npm run lint`).
  4. Execução da suíte completa de testes automatizados (`npm test`).

### 2. Continuous Delivery / Deployment (CD) - `.github/workflows/cd.yml`
- **Gatilhos:** Disparado em `push` na branch `main` e em `pull_request` direcionadas à `main`.
- **Etapas:**
  1. Checkout do repositório.
  2. Empacotamento do pacote de release da aplicação (`dist/app-release-<sha>.tar.gz`).
  3. **Smoke Test & Validação de Deploy:** Inicializa o servidor em background e realiza testes de saúde nos endpoints `/health` e `/api/info`.
  4. **Upload do Artefato:** Armazena o pacote de release gerado como artefato da build via `actions/upload-artifact@v4`.
  5. **Status de Rollout:** Emite relatório de preview (em PRs) ou deploy de produção (na branch `main`).

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js instalado (v18+)

### Iniciar o Servidor
```bash
npm start
```
O servidor será iniciado na porta padrão `3000` (ou na porta definida pela variável `PORT`).

---

## 🧪 Como Executar os Testes Automatizados

### Verificação de Sintaxe
```bash
npm run lint
```

### Executar Testes Unitários e de Integração
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
