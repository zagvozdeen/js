import { insertionSort, binarySearch, isBalanced } from './algorithms.ts';
import { readNumbers, showResult, reset } from './forms.ts';

const numbers = document.querySelector<HTMLInputElement>('#numbers')!;
const target = document.querySelector<HTMLInputElement>('#target')!;
const brackets = document.querySelector<HTMLInputElement>('#brackets')!;
const sortResult = document.querySelector<HTMLElement>('#sort-result')!;
const searchResult = document.querySelector<HTMLElement>('#search-result')!;
const bracketsResult = document.querySelector<HTMLElement>('#brackets-result')!;

document.querySelector('#sort-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(sortResult, () => `Отсортированный массив: [${insertionSort(readNumbers(numbers)).join(', ')}]`);
});

document.querySelector('#search-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(searchResult, () => {
    const value = Number(target.value);
    if (!target.value.trim() || !Number.isFinite(value)) throw new Error('Введите искомое число.');
    const sorted = insertionSort(readNumbers(numbers));
    const index = binarySearch(sorted, value);
    return `Массив: [${sorted.join(', ')}]\n${index === -1 ? 'Элемент не найден.' : `Найден индекс: ${index} (с нуля).`}`;
  });
});

document.querySelector('#brackets-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(bracketsResult, () => isBalanced(brackets.value)
    ? 'Скобки сбалансированы.' : 'Скобки не сбалансированы.');
});

numbers.addEventListener('input', () => { reset(sortResult); reset(searchResult); });
target.addEventListener('input', () => reset(searchResult));
brackets.addEventListener('input', () => reset(bracketsResult));
