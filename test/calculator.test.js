const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const calculator = require('../src/calculator');

describe('Suíte de Testes Unitários - Módulo Calculator', () => {
  // Teste Unitario 1: Operacao de Soma
  describe('add()', () => {
    it('deve somar dois numeros inteiros positivos corretamente', () => {
      assert.equal(calculator.add(5, 3), 8);
    });

    it('deve somar numeros negativos preservando o sinal', () => {
      assert.equal(calculator.add(-4, -6), -10);
    });

    it('deve lancar TypeError se algum argumento nao for numero', () => {
      assert.throws(() => calculator.add('5', 3), TypeError);
    });
  });

  // Teste Unitario 2: Operacao de Subtracao
  describe('subtract()', () => {
    it('deve subtrair dois numeros inteiros corretamente', () => {
      assert.equal(calculator.subtract(10, 4), 6);
    });

    it('deve retornar valor negativo quando subtraendo for maior que minuendo', () => {
      assert.equal(calculator.subtract(4, 10), -6);
    });
  });

  // Teste Unitario 3: Operacao de Multiplicacao
  describe('multiply()', () => {
    it('deve multiplicar dois numeros corretamente', () => {
      assert.equal(calculator.multiply(6, 7), 42);
    });

    it('deve retornar zero quando multiplicado por zero', () => {
      assert.equal(calculator.multiply(50, 0), 0);
    });
  });

  // Teste Unitario 4: Operacao de Divisao
  describe('divide()', () => {
    it('deve dividir dois numeros corretamente gerando resultado exato', () => {
      assert.equal(calculator.divide(20, 4), 5);
    });

    it('deve lancar erro explicito ao tentar dividir por zero', () => {
      assert.throws(
        () => calculator.divide(10, 0),
        /Divisao por zero nao e permitida/
      );
    });
  });

  // Teste Unitario 5: Operacao de Potenciacao
  describe('power()', () => {
    it('deve calcular a potencia de base e expoente inteiros', () => {
      assert.equal(calculator.power(2, 3), 8);
    });

    it('deve retornar 1 para qualquer numero elevado a zero', () => {
      assert.equal(calculator.power(5, 0), 1);
    });
  });

  // Teste Unitario 6: Operacao de Fatorial
  describe('factorial()', () => {
    it('deve retornar 1 para fatorial de 0 e 1', () => {
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

  // Teste Unitario 7: Operacao de Porcentagem
  describe('percentage()', () => {
    it('deve calcular a porcentagem de uma parte em relacao ao total', () => {
      assert.equal(calculator.percentage(25, 200), 12.5);
      assert.equal(calculator.percentage(50, 100), 50);
    });

    it('deve lancar erro caso o total seja zero', () => {
      assert.throws(
        () => calculator.percentage(10, 0),
        /Total nao pode ser zero para calculo de porcentagem/
      );
    });
  });

  // Teste Unitario 8: Operacao de Raiz Quadrada
  describe('squareRoot()', () => {
    it('deve calcular a raiz quadrada exata de numeros positivos', () => {
      assert.equal(calculator.squareRoot(16), 4);
      assert.equal(calculator.squareRoot(0), 0);
      assert.equal(calculator.squareRoot(81), 9);
    });

    it('deve lancar erro para raiz quadrada de numero negativo', () => {
      assert.throws(
        () => calculator.squareRoot(-9),
        /Nao e possivel calcular raiz quadrada de numero negativo/
      );
    });
  });

  // Teste Unitario 9: Calculo de Media Aritmetica
  describe('average()', () => {
    it('deve calcular a media aritmetica de um array de numeros', () => {
      assert.equal(calculator.average([10, 20, 30]), 20);
      assert.equal(calculator.average([7, 8, 9, 10]), 8.5);
    });

    it('deve retornar o proprio elemento para array unitario', () => {
      assert.equal(calculator.average([42]), 42);
    });

    it('deve lancar erro para array vazio ou nao-array', () => {
      assert.throws(
        () => calculator.average([]),
        /E necessario fornecer um array com pelo menos um numero/
      );
      assert.throws(
        () => calculator.average('invalido'),
        /E necessario fornecer um array com pelo menos um numero/
      );
    });
  });
});
