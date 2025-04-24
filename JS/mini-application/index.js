// Получение DOM элементов //
const thumbnails = document.querySelectorAll('.container__img')
const bigImageContainer = document.querySelector('.container__big')

// Функция для создания и отображения увеличенного изображения //
function showBigImage(event) {
    // Получаем URL миниатюры, на которую кликнули //
    const thumbnailSrc = event.target.src

    // Создаём новое изображение для увеличенного изображения //
    const bigImage = document.createElement('img')
    bigImage.src = thumbnailSrc // Устаналиваем тот же URL, что и у миниатюры 
    bigImage.style.width = '100%'
    bigImage.style.height = '100%'
    // Если оставлять objectFit = 'contain' , то изображение не растягивается на весь контейнер 
    // bigImage.style.objectFit = 'contain' // Чтобы изображение не искажалось 

    // Очищаем контейнер перед добавлением нового изображения //
    bigImageContainer.textContent = ""

    // Добавляем увеличенное изображение в контейнер //
    bigImageContainer.appendChild(bigImage)

    // Добавляем обработчик клика на увеличенное изображение , чтобы его можно было закрыть//
    bigImage.addEventListener('click', closeBigImage)
}

// Функциия удаления увеличенного изображения //
function closeBigImage() {
    bigImageContainer.textContent = ""    
}

// Добавляем обработчик событий, для маленьких изображений//
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', showBigImage)
})
