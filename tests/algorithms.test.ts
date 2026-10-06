import test from 'node:test';
import assert from 'node:assert/strict';
import { insertionSort, binarySearch, isBalanced } from '../site/algorithms.ts';

test('Сортировка чисел с повторами на месте', () => {
  const numbers = [3, -1, 2.5, 3, 0];
  assert.equal(insertionSort(numbers), numbers);
  assert.deepEqual(numbers, [-1, 0, 2.5, 3, 3]);
});

test('Сортировка пустого массива и одного элемента', () => {
  assert.deepEqual(insertionSort([]), []);
  assert.deepEqual(insertionSort([7]), [7]);
});

test('Сортировка прямого и обратного порядка', () => {
  assert.deepEqual(insertionSort([1, 2, 3]), [1, 2, 3]);
  assert.deepEqual(insertionSort([3, 2, 1]), [1, 2, 3]);
});

test('Поиск первого, среднего и последнего элемента', () => {
  const numbers = [-10, -2, 0.5, 4, 12];
  assert.equal(binarySearch(numbers, -10), 0);
  assert.equal(binarySearch(numbers, 0.5), 2);
  assert.equal(binarySearch(numbers, 12), 4);
  assert.deepEqual(numbers, [-10, -2, 0.5, 4, 12]);
});

test('Поиск отсутствующего числа и поиск в пустом массиве', () => {
  assert.equal(binarySearch([1, 3, 5], 2), -1);
  assert.equal(binarySearch([1, 3, 5], 0), -1);
  assert.equal(binarySearch([1, 3, 5], 6), -1);
  assert.equal(binarySearch([], 1), -1);
});

test('Поиск в массиве из одного элемента', () => {
  assert.equal(binarySearch([8], 8), 0);
  assert.equal(binarySearch([8], 3), -1);
});

test('Поиск возвращает один из повторяющихся элементов', () => {
  const numbers = [1, 2, 2, 2, 3];
  const index = binarySearch(numbers, 2);
  assert.equal(numbers[index], 2);
});

test('Правильные скобки и пустая строка', () => {
  assert.equal(isBalanced('({})'), true);
  assert.equal(isBalanced('()[]{}<>'), true);
  assert.equal(isBalanced('<({[]})>'), true);
  assert.equal(isBalanced(''), true);
});

test('Неверная вложенность и непарные скобки', () => {
  assert.equal(isBalanced('({)}'), false);
  assert.equal(isBalanced('('), false);
  assert.equal(isBalanced(')'), false);
  assert.equal(isBalanced('><'), false);
  assert.equal(isBalanced('(()'), false);
});

test('Буквы и пробелы запрещены, даже после ошибки в скобках', () => {
  assert.throws(() => isBalanced('a'), /Разрешены только скобки/);
  assert.throws(() => isBalanced('() '), /Разрешены только скобки/);
  assert.throws(() => isBalanced('([])\t'), /Разрешены только скобки/);
  assert.throws(() => isBalanced('\n'), /Разрешены только скобки/);
  assert.throws(() => isBalanced(')a'), /Разрешены только скобки/);
});
