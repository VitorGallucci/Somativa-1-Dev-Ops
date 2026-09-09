const http = require('http');
const calculator = require('./calculator');

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('JSON invalido'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const serverHandler = async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method;

  // Health check endpoint
  if (method === 'GET' && pathname === '/health') {
    return sendJson(res, 200, {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  // Info endpoint
  if (method === 'GET' && pathname === '/api/info') {
    return sendJson(res, 200, {
      name: 'Somativa 1 - DevOps API',
      version: '1.0.0',
      description: 'API para calculos e demonstracao de CI/CD'
    });
  }

  // Calculate endpoint
  if (method === 'POST' && pathname === '/api/calculate') {
    try {
      const body = await parseJsonBody(req);
      const { operation, a, b } = body;

      if (!operation) {
        return sendJson(res, 400, { error: 'Operacao nao informada' });
      }

      let result;
      switch (operation) {
        case 'add':
          result = calculator.add(a, b);
          break;
        case 'subtract':
          result = calculator.subtract(a, b);
          break;
        case 'multiply':
          result = calculator.multiply(a, b);
          break;
        case 'divide':
          result = calculator.divide(a, b);
          break;
        case 'power':
          result = calculator.power(a, b);
          break;
        case 'factorial':
          result = calculator.factorial(a);
          break;
        default:
          return sendJson(res, 400, { error: `Operacao '${operation}' desconhecida` });
      }

      return sendJson(res, 200, { operation, result });
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
  }

  // 404 fallback
  return sendJson(res, 404, { error: 'Rota nao encontrada' });
};

function createServer() {
  return http.createServer(serverHandler);
}

module.exports = {
  serverHandler,
  createServer
};
