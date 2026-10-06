const siftDown = (numbers: number[], root: number, size: number, max: boolean): void => {
    while (root * 2 + 1 < size) {
        let child = root * 2 + 1;
        const right = child + 1;

        if (right < size && (max ? numbers[right] > numbers[child] : numbers[right] < numbers[child])) {
            child = right;
        }
        if (max ? numbers[root] >= numbers[child] : numbers[root] <= numbers[child]) break;

        [numbers[root], numbers[child]] = [numbers[child], numbers[root]];
        root = child;
    }
};

// Max Heap даёт сортировку по возрастанию: O(n log n), память O(1).
export const heapSort = (numbers: number[]): number[] => {
    for (let i = Math.floor(numbers.length / 2) - 1; i >= 0; i--) {
        siftDown(numbers, i, numbers.length, true);
    }
    for (let end = numbers.length - 1; end > 0; end--) {
        [numbers[0], numbers[end]] = [numbers[end], numbers[0]];
        siftDown(numbers, 0, end, true);
    }
    return numbers;
};

export class PriorityQueue {
    private values: number[] = [];
    private max: boolean;

    constructor(max = true) {
        this.max = max;
    }

    get size(): number {
        return this.values.length;
    }

    peek = (): number | undefined => this.values[0];

    toArray = (): number[] => [...this.values];

    enqueue = (value: number): void => {
        this.values.push(value);
        let child = this.size - 1;

        while (child > 0) {
            const parent = Math.floor((child - 1) / 2);
            if (this.max ? this.values[parent] >= value : this.values[parent] <= value) break;

            [this.values[parent], this.values[child]] = [this.values[child], this.values[parent]];
            child = parent;
        }
    };

    dequeue = (): number | undefined => {
        const first = this.peek();
        const last = this.values.pop();
        if (this.size > 0) {
            this.values[0] = last!;
            siftDown(this.values, 0, this.size, this.max);
        }
        return first;
    };
}

// Для наибольших используем Min Heap, для наименьших — Max Heap.
// Время O(n log(k + 1)), память O(k). Исходный массив не меняется.
export const topK = (numbers: number[], k: number, largest: boolean): number[] => {
    if (!Number.isInteger(k) || k < 0 || k > numbers.length) {
        throw new Error("k должно быть целым числом от 0 до длины массива.");
    }
    if (k === 0) return [];

    const queue = new PriorityQueue(!largest);
    for (const value of numbers) {
        if (queue.size < k) {
            queue.enqueue(value);
        } else if (largest ? value > queue.peek()! : value < queue.peek()!) {
            queue.dequeue();
            queue.enqueue(value);
        }
    }

    const result: number[] = [];
    while (queue.size > 0) result.push(queue.dequeue()!);
    return result.reverse();
};
