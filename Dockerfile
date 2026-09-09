# Imagem base oficial do Node.js baseada em Alpine Linux para leveza e seguranca
FROM node:22-alpine

# Define o diretorio de trabalho dentro do container
WORKDIR /app

# Variaveis de ambiente padrao
ENV NODE_ENV=production
ENV PORT=3000

# Copia os metadados e scripts do projeto
COPY package.json ./

# Copia os arquivos de codigo fonte
COPY src/ ./src/

# Define o usuario nao-root (padrao da imagem node) para seguranca
USER node

# Expoe a porta da aplicacao
EXPOSE 3000

# Instrucao de verificacao de saude (Healthcheck) do container
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Comando de inicializacao do servidor
CMD ["node", "src/server.js"]
