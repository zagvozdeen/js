import { insertionSort, binarySearch, isBalanced } from './algorithms.js';

const numbers = document.querySelector('#numbers');
const target = document.querySelector('#target');
const brackets = document.querySelector('#brackets');
const sortResult = document.querySelector('#sort-result');
const searchResult = document.querySelector('#search-result');
const bracketsResult = document.querySelector('#brackets-result');

function readNumbers() {
  const text = numbers.value.trim();
  const values = text ? text.split(/\s+/).map(Number) : [];
  if (values.some(value => !Number.isFinite(value))) {
    throw new Error('Введите числа через пробел; дробную часть отделяйте точкой.');
  }
  if (values.length > 1000) throw new Error('Допускается не более 1000 чисел.');
  return values;
}

function showResult(output, calculate) {
  try {
    output.textContent = calculate();
    output.classList.remove('error');
  } catch (error) {
    output.textContent = `Недопустимый ввод. ${error.message}`;
    output.classList.add('error');
  }
}

document.querySelector('#sort-form').addEventListener('submit', event => {
  event.preventDefault();
  showResult(sortResult, () => `Отсортированный массив: [${insertionSort(readNumbers()).join(', ')}]`);
});

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  showResult(searchResult, () => {
    const value = Number(target.value);
    if (!target.value.trim() || !Number.isFinite(value)) throw new Error('Введите искомое число.');
    const sorted = insertionSort(readNumbers());
    const index = binarySearch(sorted, value);
    return `Массив: [${sorted.join(', ')}]\n${index === -1 ? 'Элемент не найден.' : `Найден индекс: ${index} (с нуля).`}`;
  });
});

document.querySelector('#brackets-form').addEventListener('submit', event => {
  event.preventDefault();
  showResult(bracketsResult, () => isBalanced(brackets.value)
    ? 'Скобки сбалансированы.' : 'Скобки не сбалансированы.');
});

function reset(output) {
  output.textContent = 'Результат появится здесь.';
  output.classList.remove('error');
}

numbers.addEventListener('input', () => { reset(sortResult); reset(searchResult); });
target.addEventListener('input', () => reset(searchResult));
brackets.addEventListener('input', () => reset(bracketsResult));
