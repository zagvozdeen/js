import { Dictionary } from './dictionary.ts';
import { showResult, reset } from './forms.ts';

const dictionary = new Dictionary();
const words = document.querySelector<HTMLTextAreaElement>('#words')!;
const word = document.querySelector<HTMLInputElement>('#word')!;
const query = document.querySelector<HTMLInputElement>('#query')!;
const listResult = document.querySelector<HTMLElement>('#list-result')!;
const addResult = document.querySelector<HTMLElement>('#add-result')!;
const searchResult = document.querySelector<HTMLElement>('#search-result')!;

document.querySelector('#list-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(listResult, () => {
    const list = words.value.split(/\r?\n/).filter(value => value.trim());
    if (!list.length) throw new Error('Введите список слов.');
    const added = dictionary.addAll(list);
    reset(searchResult);
    return `Добавлено: ${added}. Всего слов: ${dictionary.size}.`;
  });
});

document.querySelector('#add-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(addResult, () => {
    const added = dictionary.add(word.value);
    reset(searchResult);
    return `${added ? 'Слово добавлено.' : 'Слово уже есть.'} Всего слов: ${dictionary.size}.`;
  });
});

document.querySelector('#search-form')!.addEventListener('submit', event => {
  event.preventDefault();
  showResult(searchResult, () => dictionary.has(query.value) ? 'Слово есть.' : 'Слова нет.');
});

words.addEventListener('input', () => reset(listResult));
word.addEventListener('input', () => reset(addResult));
query.addEventListener('input', () => reset(searchResult));
