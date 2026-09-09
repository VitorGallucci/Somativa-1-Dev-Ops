const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const calculator = require('../src/calculator');

describe('Modulo Calculator - Testes Unitarios', () => {
  describe('add()', () => {
    it('deve somar dois numeros inteiros positivos', () => {
      assert.equal(calculator.add(5, 3), 8);
    });

    it('deve somar numeros negativos', () => {
      assert.equal(calculator.add(-4, -6), -10);
    });

    it('deve lancar erro se os argumentos nao forem numeros', () => {
      assert.throws(() => calculator.add('5', 3), TypeError);
    });
  });

  describe('subtract()', () => {
    it('deve subtrair dois numeros corretamente', () => {
      assert.equal(calculator.subtract(10, 4), 6);
    });

    it('deve retornar valor negativo quando subtraendo for maior', () => {
      assert.equal(calculator.subtract(4, 10), -6);
    });
  });

  describe('multiply()', () => {
    it('deve multiplicar dois numeros corretamente', () => {
      assert.equal(calculator.multiply(6, 7), 42);
    });

    it('deve retornar zero quando multiplicado por zero', () => {
      assert.equal(calculator.multiply(50, 0), 0);
    });
  });

  describe('divide()', () => {
    it('deve dividir dois numeros corretamente', () => {
      assert.equal(calculator.divide(20, 4), 5);
    });

    it('deve lancar erro ao tentar dividir por zero', () => {
      assert.throws(
        () => calculator.divide(10, 0),
        /Divisao por zero nao e permitida/
      );
    });
  });

  describe('power()', () => {
    it('deve calcular a potencia corretamente', () => {
      assert.equal(calculator.power(2, 3), 8);
      assert.equal(calculator.power(5, 0), 1);
    });
  });

  describe('factorial()', () => {
    it('deve calcular fatorial de 0 e 1 como 1', () => {
      assert.equal(calculator.factorial(0), 1);
      assert.equal(calculator.factorial(1), 1);
    });

    it('deve calcular fatorial de 5 como 120', () => {
      assert.equal(calculator.factorial(5), 120);
    });

    it('deve lancar erro para numero negativo ou nao-inteiro', () => {
      assert.throws(() => calculator.factorial(-1), /Fatorial requer um numero inteiro nao-negativo/);
      assert.throws(() => calculator.factorial(2.5), /Fatorial requer um numero inteiro nao-negativo/);
    });
  });
});
