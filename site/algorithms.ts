// Сортировка вставками: O(n^2) в среднем и худшем случае, O(n) в лучшем;
// дополнительная память O(1). Исходный массив изменяется на месте.
export const insertionSort = (numbers: number[]): number[] => {
    for (let i = 1; i < numbers.length; i++) {
        const value = numbers[i];
        let j = i - 1;

        while (j >= 0 && numbers[j] > value) {
            numbers[j + 1] = numbers[j];
            j--;
        }
        numbers[j + 1] = value;
    }
    return numbers;
};

// Массив должен быть отсортирован по возрастанию.
// Время O(log n), дополнительная память O(1).
export const binarySearch = (numbers: number[], target: number): number => {
    let left = 0;
    let right = numbers.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);
        if (numbers[middle] === target) return middle;
        if (numbers[middle] < target) left = middle + 1;
        else right = middle - 1;
    }
    return -1;
};

// Время O(n), дополнительная память O(n) для стека.
export const isBalanced = (text: string): boolean => {
    if (/[^()[\]{}<>]/.test(text)) {
        throw new Error("Разрешены только скобки ()[]{}<> без пробелов.");
    }

    const opening: Record<string, string> = {")": "(", "]": "[", "}": "{", ">": "<"};
    const stack: string[] = [];

    for (const bracket of text) {
        if (opening[bracket]) {
            if (stack.pop() !== opening[bracket]) return false;
        } else {
            stack.push(bracket);
        }
    }
    return stack.length === 0;
};
