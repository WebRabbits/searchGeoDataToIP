// Очищение поля ввода при корректных/некорректных введённых данных в поле IP-адреса

export function removeInputValue(event, valInput) {
  event.target.className == 'search-bar__btn' ||
  event.target.className == 'search-bar__input'
    ? (valInput.value = '')
    : false;
}
