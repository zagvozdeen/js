import test from "node:test";
import assert from "node:assert/strict";
import { insertionSort, binarySearch, isBalanced } from "../site/algorithms.js";

const sortingCases = [
  ["пустой массив", [], []],
  ["один элемент", [7], [7]],
  ["отрицательные числа", [-3, -1, -7, 0], [-7, -3, -1, 0]],
  ["дробные числа", [2.5, 0.25, -1.75], [-1.75, 0.25, 2.5]],
  ["дубликаты", [3, 1, 3, 1, 2], [1, 1, 2, 3, 3]],
  ["обратный порядок", [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]],
  ["уже отсортирован", [1, 2, 3, 4, 5], [1, 2, 3, 4, 5]],
];

for (const [name, numbers, expected] of sortingCases) {
  test(`Сортировка на месте: ${name}`, () => {
    assert.strictEqual(insertionSort(numbers), numbers);
    assert.deepEqual(numbers, expected);
  });
}

const searchCases = [
  ["середина", [-10, -2, 0, 4, 12], 0, 2],
  ["первый элемент", [-10, -2, 0, 4, 12], -10, 0],
  ["последний элемент", [-10, -2, 0, 4, 12], 12, 4],
  ["нет между элементами", [-10, -2, 0, 4, 12], 3, -1],
  ["меньше минимума", [-10, -2, 0, 4, 12], -20, -1],
  ["больше максимума", [-10, -2, 0, 4, 12], 20, -1],
  ["пустой массив", [], 1, -1],
  ["единственный найден", [8], 8, 0],
  ["единственный не найден", [8], 3, -1],
  ["дробное число", [-1.5, 0.25, 2.5], 0.25, 1],
];

for (const [name, numbers, target, expected] of searchCases) {
  test(`Бинарный поиск: ${name}`, () => {
    const before = [...numbers];
    assert.equal(binarySearch(numbers, target), expected);
    assert.deepEqual(numbers, before);
  });
}

test("Бинарный поиск возвращает индекс одного из дубликатов", () => {
  const numbers = [1, 2, 2, 2, 3];
  const index = binarySearch(numbers, 2);
  assert.ok(index >= 1 && index <= 3);
  assert.equal(numbers[index], 2);
});

test("Сбалансированные скобки, все пары и пустая строка", () => {
  for (const text of ["", "({})", "()[]{}<>", "({[<>]})", "<({[]})>"]) {
    assert.equal(isBalanced(text), true, text);
  }
});

test("Неверный порядок и непарные скобки", () => {
  for (const text of ["({)}", ")", "(", "><", "[(])", "(()", "[[]]]"]) {
    assert.equal(isBalanced(text), false, text);
  }
});

test("Посторонние символы запрещены даже после ошибки балансировки", () => {
  for (const text of ["a", "() ", " ([]) ", "([])\t", "\n", "❌", ")a", ") ", ")\n"]) {
    assert.throws(() => isBalanced(text), {
      name: "Error",
      message: "Разрешены только скобки ()[]{}<> без пробелов.",
    });
  }
});
