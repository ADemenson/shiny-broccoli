// Реализуем валидацию форма
const validation = new JustValidate('#film-form');

validation
    .addField('#title', [
        {
            rule: 'required',
            errorMessage: 'Введите название фильма'
        }
    ], {
        errorsContainer: document.getElementById('error-title'), // Контейнер для сообщения об ошибке
    })
    .addField('#genre', [
        {
            rule: 'required',
            errorMessage: 'Введите жанр'
        }
    ], {
        errorsContainer: document.getElementById('error-genre'), // Контейнер для сообщения об ошибке
    })
    .addField('#releaseYear', [
        {
            rule: 'required',
            errorMessage: 'Введите год выпуска фильма'
        }
    ], {
        errorsContainer: document.getElementById('error-releaseYear'), // Контейнер для сообщения об ошибке
    })
    .onSuccess((e) => {  // Обработчик успешной валидации
        handleFormSubmit(e);  // Вызываем обработчик отправки формы
    });

// Функция обрабатывания фильмов
function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;

    const film = {
        title,
        genre,
        releaseYear,
        isWatched
    }

    addFilm(film);
    const form = document.getElementById('film-form');
    form.reset();
}

// Функция добавления фильма
async function addFilm(film) {
    try {
        const response = await fetch('https://sb-film.skillbox.cc/films', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                email: 'Artem.d.2004@gmail.com',
            },
            body: JSON.stringify(film)
        });

        if (!response.ok) {
            throw new Error(`Ошибка при добавлении фильма: ${response.status}`);
        }

        await renderTable();

    } catch (error) {
        console.error('Ошибка при добавлении фильма:', error);
        showError('Не удалось добавить фильм. Проверьте данные и попробуйте снова.');
    }
}

// Создаём функцию отрисовки таблицы
async function renderTable() {
    // Реализуем единый механизм фильтрации
    await applyFilters();
    const response = await fetch('https://sb-film.skillbox.cc/films', {
        headers: {
            email: 'Artem.d.2004@gmail.com',
        },
    });

    const films = await response.json();

    const filmTableBody = document.querySelector('#film-tbody');
    filmTableBody.innerHTML = "";

    films.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td><button class="delete-btn" data-id="${film.id}">Удалить</button></td>
        `
        filmTableBody.appendChild(row);
    });

    addButtonEventListener()
}

// Обработчик для кнопки
function addButtonEventListener() {
    // Обработчки для кнопки "Удалить"
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (confirm("Удалить фильм?")) deleteFilm(id);
        });
    });
}

// Функция для удаления фильма
async function deleteFilm(id) {
    const response = await fetch(`https://sb-film.skillbox.cc/films/${id}`, {
        method: "DELETE",
        headers: {
            email: "Artem.d.2004@gmail.com",
        },
    });

    const data = await response.json();
    console.log(data);
    renderTable();
}

// Добавляем функционал кнопке "Удалить всё"
const btnDeleteAllEl = document.querySelector('.form-search__btn');
btnDeleteAllEl.addEventListener('click', () => confirm("Удалить все фильмы?") && clearAllFilms());

// Создаём функцию, которая удалит все фильмы
async function clearAllFilms() {
    const response = await fetch('https://sb-film.skillbox.cc/films', {
        method: "DELETE",
        headers: {
            email: "Artem.d.2004@gmail.com",
        },
    })

    const data = await response.json();
    console.log(data);
    renderTable();
}

// Добавляем обработчики событий для полей фильтрации
document.getElementById('titleSearch').addEventListener('input', applyFilters);
document.getElementById('genreSearch').addEventListener('input', applyFilters);
document.getElementById('releaseYearSearch').addEventListener('input', applyFilters);

// Функция для применения фильтров
async function applyFilters() {
    try {
        // Получаем значения из полей поиска
        const title = document.getElementById('titleSearch').value;
        const genre = document.getElementById('genreSearch').value;
        const releaseYear = document.getElementById('releaseYearSearch').value;

        // Создаём параметры запроса
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (genre) params.append('genre', genre);
        if (releaseYear) params.append('releaseYear', releaseYear);

        // Отправляем запрос на сервер с параметрами фильтрации 
        const response = await fetch(`https://sb-film.skillbox.cc/films?${params.toString()}`, {
            headers: {
                email: 'Artem.d.2004@gmail.com',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }

        // Получаем отфильтрованные данные
        const films = await response.json();

        // Отрисовываем таблицу с полченными данными
        renderFilteredTable(films);
    } catch (error) {
        // Оработка ошибок
        console.error('Ошибка при фильтрации фильмов:', error);
    }
}

// Функция для отрисовки отфильтрованной таблицы
function renderFilteredTable(films) {
    const filmTableBody = document.querySelector('#film-tbody');
    filmTableBody.innerHTML = "";

    // Для каждого фильма создаём строку таблицы
    films.forEach(film => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.genre}</td>
        <td>${film.releaseYear}</td>
        <td>${film.isWatched ? "Да" : "Нет"}</td>
        <td><button class="delete-btn" data-id="${film.id}">Удалить</button></td>
        `;
        filmTableBody.appendChild(row);

        // Добавляем обработчики для кнопок удаления
        addButtonEventListener();
    })
}

document.querySelector('#film-form').removeEventListener('submit', handleFormSubmit);
renderTable();