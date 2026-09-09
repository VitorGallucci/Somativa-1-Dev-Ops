# DevOps: Calculadora API, CI/CD Pipeline & Docker Container

[![Continuous Integration (CI)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/ci.yml)
[![Continuous Delivery (CD)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml/badge.svg)](https://github.com/VitorGallucci/Somativa-1-Dev-Ops/actions/workflows/cd.yml)

Projeto prático desenvolvido para a disciplina de **DevOps**.

Este repositório implementa um fluxo completo de **Integração Contínua (CI)**, **Entrega/Deploy Contínuo (CD)** via **GitHub Actions** e **Dockerização** da aplicação para execução isolada e portável em containers.

---

## 🚀 Tecnologias Utilizadas

- **Runtime:** [Node.js](https://nodejs.org/) (v20+ e v22+)
- **Containerização:** [Docker](https://www.docker.com/) (imagem base `node:22-alpine`)
- **Protocolo:** HTTP / REST
- **Test Runner & Assertions:** `node:test` e `node:assert/strict` (nativos do Node.js)
- **CI/CD:** GitHub Actions
- **Controle de Versão:** Git & GitHub

---

## 📁 Estrutura de Diretórios

```text
├── .github/
│   └── workflows/
│       ├── ci.yml            # Pipeline de Integracao Continua (CI e Docker build test)
│       └── cd.yml            # Pipeline de Entrega/Deploy Continuo (CD)
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
Você verá o container `calculadora-app` listado com status `Up` e a porta `0.0.0.0:3000->3000/tcp` mapeada.

### 4. Testar a Aplicação no Container
- **Healthcheck:**
  ```bash
  curl http://localhost:3000/health
  ```
- **Realizar um Cálculo:**
  ```bash
  curl -X POST http://localhost:3000/api/calculate \
    -H "Content-Type: application/json" \
    -d '{"operation":"multiply","a":7,"b":8}'
  ```

### 5. Parar o Container
```bash
docker stop calculadora-app && docker rm calculadora-app
```

---

## 🔄 Fluxo de CI/CD (GitHub Actions)

O pipeline conta com dois workflows integrados:

### 1. Continuous Integration (CI) - `.github/workflows/ci.yml`
- **Gatilhos:** Disparado em `push` na branch `main` e em `pull_request` direcionadas à `main`.
- **Jobs:**
  1. `build-and-test`: Executa em matriz com Node.js `20.x` e `22.x`, validando lint (`npm run lint`) e suíte de testes (`npm test`).
  2. `docker-build-test`: Valida o build do `Dockerfile` através do `docker/build-push-action`, garantindo que nenhuma quebra de containerização passe despercebida.

### 2. Continuous Delivery / Deployment (CD) - `.github/workflows/cd.yml`
- **Gatilhos:** Disparado em `push` na branch `main` e em `pull_request` direcionadas à `main`.
- **Jobs:**
  1. Empacotamento do pacote de release (`dist/app-release-<sha>.tar.gz`).
  2. **Smoke Test & Validação de Deploy:** Sobe a aplicação e testa endpoints de saúde.
  3. **Upload do Artefato:** Armazena o artefato gerado via `actions/upload-artifact@v4`.
  4. **Relatório de Rollout:** Emite log de validação para preview em PR ou deploy em produção.

---

## 🛠️ Como Executar Localmente (Sem Docker)

```bash
npm start
```
O servidor estará acessível em `http://localhost:3000`.

---

## 🧪 Testes Automatizados

```bash
npm run lint  # Verificacao estatica de sintaxe
npm test      # 18 testes unitarios e de integracao
```
