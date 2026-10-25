type Node = { children: Map<string, Node>; end: boolean };

const createNode = (): Node => ({ children: new Map(), end: false });

const normalize = (word: string): string => {
    const result = word.trim().toLowerCase();
    if (!/^[а-яё]+$/u.test(result)) {
        throw new Error("Введите слово из русских букв без пробелов и знаков.");
    }
    return result;
};

export class Dictionary {
    private root = createNode();
    private count = 0;

    get size(): number {
        return this.count;
    }

    add = (word: string): boolean => {
        let node = this.root;
        for (const letter of normalize(word)) {
            let child = node.children.get(letter);
            if (!child) {
                child = createNode();
                node.children.set(letter, child);
            }
            node = child;
        }
        if (node.end) return false;
        node.end = true;
        this.count++;
        return true;
    };

    addAll = (words: string[]): number => {
        words.forEach(normalize);
        const before = this.size;
        for (const word of words) this.add(word);
        return this.size - before;
    };

    has = (word: string): boolean => {
        let node = this.root;
        for (const letter of normalize(word)) {
            const child = node.children.get(letter);
            if (!child) return false;
            node = child;
        }
        return node.end;
    };
}
