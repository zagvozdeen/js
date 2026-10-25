import test from "node:test";
import assert from "node:assert/strict";
import { Dictionary } from "../site/dictionary.ts";

test("В пустом словаре нет слов", () => {
    const dictionary = new Dictionary();
    assert.equal(dictionary.size, 0);
    assert.equal(dictionary.has("кот"), false);
    assert.equal(dictionary.addAll([]), 0);
});

test("Поиск отличает целое слово от префикса", () => {
    const dictionary = new Dictionary();
    assert.equal(dictionary.add("кошка"), true);
    assert.equal(dictionary.has("кошка"), true);
    assert.equal(dictionary.has("кош"), false);
    assert.equal(dictionary.has("кошки"), false);
    assert.equal(dictionary.size, 1);
});

test("Слова с общим префиксом хранятся независимо", () => {
    const dictionary = new Dictionary();
    dictionary.addAll(["лесник", "лес", "лесной"]);
    assert.equal(dictionary.has("лес"), true);
    assert.equal(dictionary.has("лесник"), true);
    assert.equal(dictionary.has("лесной"), true);
    assert.equal(dictionary.has("лесн"), false);
});

test("Повторы не увеличивают размер словаря", () => {
    const dictionary = new Dictionary();
    dictionary.add("дом");
    assert.equal(dictionary.addAll(["дом", "кот", "кот", "лес"]), 2);
    assert.equal(dictionary.add("кот"), false);
    assert.equal(dictionary.size, 3);
});

test("Регистр и пробелы по краям не учитываются", () => {
    const dictionary = new Dictionary();
    dictionary.add("  Кошка  ");
    assert.equal(dictionary.has("КОШКА"), true);
    assert.equal(dictionary.has(" кошка "), true);
    assert.equal(dictionary.add("кошка"), false);
    assert.equal(dictionary.size, 1);
});

test("Буквы е и ё различаются", () => {
    const dictionary = new Dictionary();
    dictionary.add("Ёлка");
    assert.equal(dictionary.has("ёлка"), true);
    assert.equal(dictionary.has("елка"), false);
    assert.equal(dictionary.add("елка"), true);
    assert.equal(dictionary.size, 2);
});

test("Пустые слова и посторонние символы отклоняются", () => {
    const dictionary = new Dictionary();
    for (const word of ["", "   ", "кот2", "cat", "два слова", "кот!"]) {
        assert.throws(() => dictionary.add(word), /Введите слово/);
        assert.throws(() => dictionary.has(word), /Введите слово/);
    }
    assert.equal(dictionary.size, 0);
});

test("Ошибка в списке не добавляет ни одного слова из списка", () => {
    const dictionary = new Dictionary();
    dictionary.add("дом");
    assert.throws(() => dictionary.addAll(["кот", "123", "лес"]), /Введите слово/);
    assert.equal(dictionary.size, 1);
    assert.equal(dictionary.has("дом"), true);
    assert.equal(dictionary.has("кот"), false);
    assert.equal(dictionary.has("лес"), false);
});
