import { heapSort, topK, PriorityQueue } from './heap.ts';
import { readNumbers, showResult, reset } from './forms.ts';

const numbers = document.querySelector<HTMLInputElement>('#numbers')!;
const count = document.querySelector<HTMLInputElement>('#count')!;
const sortResult = document.querySelector<HTMLElement>('#sort-result')!;
const topResult = document.querySelector<HTMLElement>('#top-result')!;
const queueType = document.querySelector<HTMLSelectElement>('#queue-type')!;
const queueValue = document.querySelector<HTMLInputElement>('#queue-value')!;
const queueResult = document.querySelector<HTMLElement>('#queue-result')!;
let queue = new PriorityQueue();

document.querySelector('#sort-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(sortResult, () => `Отсортированный массив: [${heapSort(readNumbers(numbers)).join(', ')}]`);
});

document.querySelector('#top-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(topResult, () => {
    if (!count.value.trim()) throw new Error('Введите k.');
    const values = readNumbers(numbers);
    const k = Number(count.value);
    return `Наибольшие: [${topK(values, k, true).join(', ')}]\nНаименьшие: [${topK(values, k, false).join(', ')}]`;
  });
});

const describeQueue = () => `Куча: [${queue.toArray().join(', ')}]\nПервый: ${queue.peek() ?? '—'}. Элементов: ${queue.size}.`;

document.querySelector('#queue-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(queueResult, () => {
    const value = Number(queueValue.value);
    if (!queueValue.value.trim() || !Number.isFinite(value)) throw new Error('Введите число.');
    if (queue.size >= 1000) throw new Error('Допускается не более 1000 элементов.');
    queue.enqueue(value);
    return `Добавлено: ${value}.\n${describeQueue()}`;
  });
});

document.querySelector('#dequeue')!.addEventListener('click', () => {
  showResult(queueResult, () => {
    const value = queue.dequeue();
    return `${value === undefined ? 'Очередь пуста.' : `Извлечено: ${value}.`}\n${describeQueue()}`;
  });
});

document.querySelector('#clear-queue')!.addEventListener('click', () => {
  queue = new PriorityQueue(queueType.value === 'max');
  showResult(queueResult, describeQueue);
});

queueType.addEventListener('change', () => {
  const values = queue.toArray();
  queue = new PriorityQueue(queueType.value === 'max');
  values.forEach(queue.enqueue);
  showResult(queueResult, describeQueue);
});

numbers.addEventListener('input', () => { reset(sortResult); reset(topResult); });
count.addEventListener('input', () => reset(topResult));
