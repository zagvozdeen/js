export const readNumbers = (input: HTMLInputElement): number[] => {
  const text = input.value.trim();
  const values = text ? text.split(/\s+/).map(Number) : [];
  if (values.some(value => !Number.isFinite(value))) {
    throw new Error('Введите числа через пробел; дробную часть отделяйте точкой.');
  }
  if (values.length > 1000) throw new Error('Допускается не более 1000 чисел.');
  return values;
};

export const showResult = (output: HTMLElement, calculate: () => string): void => {
  try {
    output.textContent = calculate();
    output.classList.remove('error');
  } catch (error) {
    output.textContent = `Недопустимый ввод. ${error instanceof Error ? error.message : String(error)}`;
    output.classList.add('error');
  }
};

export const reset = (output: HTMLElement): void => {
  output.textContent = 'Результат появится здесь.';
  output.classList.remove('error');
};
