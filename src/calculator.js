/**
 * Modulo de regras de negocio da calculadora.
 * Contem validacoes e operacoes aritmeticas basicas e avancadas.
 */

function validateNumbers(...nums) {
  for (const num of nums) {
    if (typeof num !== 'number' || Number.isNaN(num)) {
      throw new TypeError('Todos os argumentos devem ser numeros validos');
    }
  }
}

function add(a, b) {
  validateNumbers(a, b);
  return a + b;
}

function subtract(a, b) {
  validateNumbers(a, b);
  return a - b;
}

function multiply(a, b) {
  validateNumbers(a, b);
  return a * b;
}

function divide(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new Error('Divisao por zero nao e permitida');
  }
  return a / b;
}

function power(base, exponent) {
  validateNumbers(base, exponent);
  return Math.pow(base, exponent);
}

function factorial(n) {
  validateNumbers(n);
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Fatorial requer um numero inteiro nao-negativo');
  }
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function percentage(part, total) {
  validateNumbers(part, total);
  if (total === 0) {
    throw new Error('Total nao pode ser zero para calculo de porcentagem');
  }
  return (part / total) * 100;
}

function squareRoot(n) {
  validateNumbers(n);
  if (n < 0) {
    throw new Error('Nao e possivel calcular raiz quadrada de numero negativo');
  }
  return Math.sqrt(n);
}

function average(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('E necessario fornecer um array com pelo menos um numero');
  }
  validateNumbers(...numbers);
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);
  return sum / numbers.length;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
  power,
  factorial,
  percentage,
  squareRoot,
  average
};
