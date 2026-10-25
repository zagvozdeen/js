type Character = string | symbol;
type Node = { start: number; end: number; children: Map<Character, Node> };

const createNode = (start: number, end: number): Node => ({ start, end, children: new Map() });

export class SuffixTree {
  private readonly characters: Character[];
  private root = createNode(0, 0);

  constructor(text: string | Character[]) {
    this.characters = [...text, Symbol()];
    for (let start = 0; start < this.characters.length; start++) this.insert(start);
  }

  private insert = (start: number): void => {
    const text = this.characters;
    let node = this.root;
    let position = start;
    while (position < text.length) {
      const child = node.children.get(text[position]);
      if (!child) {
        node.children.set(text[position], createNode(position, text.length));
        return;
      }
      let matched = 0;
      while (child.start + matched < child.end && text[child.start + matched] === text[position + matched]) {
        matched++;
      }
      if (child.start + matched === child.end) {
        position += matched;
        node = child;
      } else {
        const split = createNode(child.start, child.start + matched);
        node.children.set(text[position], split);
        child.start += matched;
        split.children.set(text[child.start], child);
        split.children.set(text[position + matched], createNode(position + matched, text.length));
        return;
      }
    }
  };

  commonPrefix = (left: number, right: number): number => {
    const text = this.characters;
    const size = text.length - 1;
    if (![left, right].every(index => Number.isInteger(index) && index >= 0 && index <= size)) {
      throw new Error('Индекс суффикса выходит за границы строки.');
    }
    let node = this.root;
    let length = 0;
    while (left + length < size && right + length < size) {
      if (text[left + length] !== text[right + length]) break;
      const child = node.children.get(text[left + length])!;
      length += child.end - child.start;
      node = child;
    }
    return Math.min(length, size - Math.max(left, right));
  };
}

export const longestPalindrome = (text: string): string => {
  const characters = [...text];
  const size = characters.length;
  const tree = new SuffixTree([...characters, Symbol(), ...characters.slice().reverse()]);
  let bestStart = 0;
  let bestLength = 0;
  const save = (start: number, length: number): void => {
    if (length > bestLength) {
      bestStart = start;
      bestLength = length;
    }
  };
  for (let center = 0; center < size; center++) {
    const odd = tree.commonPrefix(center, 2 * size - center);
    save(center - odd + 1, 2 * odd - 1);
    const even = tree.commonPrefix(center, 2 * size + 1 - center);
    save(center - even, 2 * even);
  }
  return characters.slice(bestStart, bestStart + bestLength).join('');
};
