document.addEventListener('DOMContentLoaded', function() {
  // Находим кнопку бургера и header
  const burgerButton = document.querySelector('.header__burger');
  const header = document.querySelector('.header');
  
  // Проверяем, что элементы существуют
  if (burgerButton && header) {
    // Добавляем обработчик клика
    burgerButton.addEventListener('click', function() {
      // Переключаем класс header--open
      header.classList.toggle('header--open');
    });
  }
});