import { longestPalindrome } from './suffix-tree.ts';
import { showResult, reset } from './forms.ts';

const text = document.querySelector<HTMLTextAreaElement>('#text')!;
const result = document.querySelector<HTMLElement>('#palindrome-result')!;

document.querySelector('#palindrome-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(result, () => {
    if ([...text.value].length > 1000) throw new Error('Допускается не более 1000 символов.');
    const palindrome = longestPalindrome(text.value);
    return palindrome ? `Палиндром: ${palindrome}\nДлина: ${[...palindrome].length}` : 'Пустая строка. Длина: 0.';
  });
});

text.addEventListener('input', () => reset(result));
