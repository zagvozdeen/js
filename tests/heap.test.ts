import test from "node:test";
import assert from "node:assert/strict";
import { heapSort, topK, PriorityQueue } from "../site/heap.ts";

test("Пирамидальная сортировка изменяет исходный массив", () => {
    const numbers = [5, -2, 5, 0, 1.5];
    assert.equal(heapSort(numbers), numbers);
    assert.deepEqual(numbers, [-2, 0, 1.5, 5, 5]);
});

test("Пирамидальная сортировка: пустой массив и один элемент", () => {
    assert.deepEqual(heapSort([]), []);
    assert.deepEqual(heapSort([7]), [7]);
});

test("Пирамидальная сортировка: прямой и обратный порядок", () => {
    assert.deepEqual(heapSort([1, 2, 3, 4]), [1, 2, 3, 4]);
    assert.deepEqual(heapSort([4, 3, 2, 1]), [1, 2, 3, 4]);
});

test("Три наибольших элемента с повторами", () => {
    const numbers = [5, 1, 5, 3, 2];
    assert.deepEqual(topK(numbers, 3, true), [5, 5, 3]);
    assert.deepEqual(numbers, [5, 1, 5, 3, 2]);
});

test("Три наименьших элемента с повторами и дробями", () => {
    assert.deepEqual(topK([3, -2, 1.5, -2, 8], 3, false), [-2, -2, 1.5]);
});

test("Топ-k: ноль, один и все элементы", () => {
    assert.deepEqual(topK([], 0, true), []);
    assert.deepEqual(topK([3, 1, 2], 0, false), []);
    assert.deepEqual(topK([3, 1, 2], 1, true), [3]);
    assert.deepEqual(topK([3, 1, 2], 1, false), [1]);
    assert.deepEqual(topK([3, 1, 2], 3, true), [3, 2, 1]);
    assert.deepEqual(topK([3, 1, 2], 3, false), [1, 2, 3]);
});

test("Топ-k отклоняет неверное k", () => {
    assert.throws(() => topK([1, 2], -1, true));
    assert.throws(() => topK([1, 2], 3, true));
    assert.throws(() => topK([1, 2], 1.5, false));
    assert.throws(() => topK([1, 2], NaN, false));
});

test("Пустая очередь и удаление единственного элемента", () => {
    const queue = new PriorityQueue();
    assert.equal(queue.size, 0);
    assert.equal(queue.peek(), undefined);
    assert.equal(queue.dequeue(), undefined);
    queue.enqueue(7);
    assert.equal(queue.peek(), 7);
    assert.equal(queue.dequeue(), 7);
    assert.equal(queue.size, 0);
    assert.equal(queue.dequeue(), undefined);
});

test("Max Heap сохраняет порядок после добавлений и удалений", () => {
    const queue = new PriorityQueue();
    for (const value of [3, 8, 2, 8, -1]) queue.enqueue(value);
    assert.equal(queue.dequeue(), 8);
    queue.enqueue(10);
    queue.enqueue(4);

    const heap = queue.toArray();
    for (let child = 1; child < heap.length; child++) {
        assert.ok(heap[Math.floor((child - 1) / 2)] >= heap[child]);
    }
    const result: number[] = [];
    while (queue.size > 0) result.push(queue.dequeue()!);
    assert.deepEqual(result, [10, 8, 4, 3, 2, -1]);
});

test("Min Heap выдаёт минимум после добавлений и удалений", () => {
    const queue = new PriorityQueue(false);
    for (const value of [3, -2, 1.5, -2, 8]) queue.enqueue(value);
    assert.equal(queue.dequeue(), -2);
    queue.enqueue(-5);

    const heap = queue.toArray();
    for (let child = 1; child < heap.length; child++) {
        assert.ok(heap[Math.floor((child - 1) / 2)] <= heap[child]);
    }
    const result: number[] = [];
    while (queue.size > 0) result.push(queue.dequeue()!);
    assert.deepEqual(result, [-5, -2, 1.5, 3, 8]);
});

test("Массив из toArray не меняет очередь", () => {
    const queue = new PriorityQueue();
    queue.enqueue(5);
    const copy = queue.toArray();
    copy[0] = 100;
    assert.equal(queue.peek(), 5);
});
