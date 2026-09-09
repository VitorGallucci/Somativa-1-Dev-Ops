const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../src/app');

describe('API REST - Testes de Integracao', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = createServer();
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('GET /health deve responder com status UP e codigo 200', async () => {
    const res = await fetch(`${baseUrl}/health`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.status, 'UP');
    assert.ok(typeof body.uptime === 'number');
  });

  it('GET /api/info deve retornar informacoes sobre o projeto', async () => {
    const res = await fetch(`${baseUrl}/api/info`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.name, 'Somativa 1 - DevOps API');
    assert.equal(body.version, '1.0.0');
  });

  it('POST /api/calculate com operacao add deve retornar resultado correto', async () => {
    const res = await fetch(`${baseUrl}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operation: 'add', a: 15, b: 25 })
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.result, 40);
  });

  it('POST /api/calculate com divisao por zero deve retornar erro 400', async () => {
    const res = await fetch(`${baseUrl}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ operation: 'divide', a: 10, b: 0 })
    });
    const body = await res.json();

    assert.equal(res.status, 400);
    assert.ok(body.error.includes('zero'));
  });

  it('GET em rota inexistente deve retornar 404', async () => {
    const res = await fetch(`${baseUrl}/rota-aleatoria`);
    const body = await res.json();

    assert.equal(res.status, 404);
    assert.equal(body.error, 'Rota nao encontrada');
  });
});
