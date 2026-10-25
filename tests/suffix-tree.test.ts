import test from 'node:test';
import assert from 'node:assert/strict';
import { SuffixTree, longestPalindrome } from '../site/suffix-tree.ts';

test('Дерево находит общий префикс суффиксов', () => {
  const tree = new SuffixTree('banana');
  assert.equal(tree.commonPrefix(1, 3), 3);
  assert.equal(tree.commonPrefix(0, 1), 0);
  assert.equal(tree.commonPrefix(1, 1), 5);
  assert.equal(tree.commonPrefix(0, 6), 0);
});

test('Дерево обрабатывает повторяющиеся символы и проверяет индексы', () => {
  const tree = new SuffixTree('aaaa');
  assert.equal(tree.commonPrefix(0, 1), 3);
  assert.equal(tree.commonPrefix(1, 3), 1);
  assert.throws(() => tree.commonPrefix(-1, 0), /Индекс/);
  assert.throws(() => tree.commonPrefix(0, 5), /Индекс/);
});

test('Пустая строка и один символ', () => {
  assert.equal(longestPalindrome(''), '');
  assert.equal(longestPalindrome('я'), 'я');
});

test('Нечётные и чётные палиндромы', () => {
  assert.equal(longestPalindrome('bananas'), 'anana');
  assert.equal(longestPalindrome('cbbd'), 'bb');
  assert.equal(longestPalindrome('abba'), 'abba');
  assert.equal(longestPalindrome('aaaa'), 'aaaa');
});

test('При одинаковой длине выбирается первый палиндром', () => {
  assert.equal(longestPalindrome('babad'), 'bab');
  assert.equal(longestPalindrome('abc'), 'a');
});

test('Учитываются регистр, пробелы и знаки', () => {
  assert.equal(longestPalindrome('Аа'), 'А');
  assert.equal(longestPalindrome(' a '), ' a ');
  assert.equal(longestPalindrome('#$#$#'), '#$#$#');
  assert.equal(longestPalindrome('\0a\0'), '\0a\0');
});

test('Эмодзи считаются отдельными символами', () => {
  assert.equal(longestPalindrome('x😀a😀y'), '😀a😀');
  assert.equal(new SuffixTree('😀a😀b').commonPrefix(0, 2), 1);
});

test('Общая подстрока с обратной строкой не обязательно является палиндромом', () => {
  assert.equal(longestPalindrome('abacdfgdcaba'), 'aba');
});
