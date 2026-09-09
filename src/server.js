const { createServer } = require('./app');

const PORT = process.env.PORT || 3000;
const server = createServer();

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Healthcheck disponivel em: http://localhost:${PORT}/health`);
});
