// Файл для создания компонентов
// Получение элемента карточки
function getCardEl(text) {
    const cardFEl = document.createElement('div')
    cardFEl.classList.add('card');
    return cardFEl;
}

// Получение элемента заголовка
function getTitelEl(text) {
    const titleEl = document.createElement('h1');
    titleEl.textContent = text;
    titleEl.classList.add('main-title');
    return titleEl;
}

// получение элемента для заголовка и кнопки
function getContainerForTable() {
    const containerForTable = document.createElement('div');
    containerForTable.classList.add('container-wrap');
    return containerForTable;
}

// Получение элемента формы
function getFormEl(id) {
    const formEl = document.createElement('form');
    formEl.classList.add('form');
    formEl.id = id;
    return formEl;
}

// Получение элемента текстового поля
function getInputEl(type, name, placeholder, id) {
    const inputEl = document.createElement('input');
    inputEl.type = type;
    inputEl.name = name;
    inputEl.placeholder = placeholder;
    inputEl.id = id;
    inputEl.required = true;
    inputEl.classList.add('text-field');
    return inputEl;
}

// Получение элемента кнопки
function getButtonEl(text, type = "button") {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = text;
    buttonEl.type = type;
    buttonEl.classList.add('btn')
    return buttonEl;
}

// Получение элемента таблицы
function getTableEl() {
    const tableEl = document.createElement('table');
    tableEl.classList.add('product-table')
    const theadEl = document.createElement('thead');
    tableEl.appendChild(theadEl);
    const trEl = document.createElement('tr');
    theadEl.appendChild(trEl);
    const headers = ["Название", "Полка", "Вес", "Время хранения", ""]

    headers.forEach(text => {
        const thEl = document.createElement('th');
        const btnEl = document.createElement('button');
        // btnEl.textContent = text;
        thEl.textContent = text;
        btnEl.appendChild(thEl)
        trEl.append(thEl);
    })
    return tableEl;
}

// Получения элемента таблицы для заполнения
function getTableTbody(id) {
    const tbodyEl = document.createElement('tbody');
    tbodyEl.id = id;
    return tbodyEl;
}

export {
    getCardEl,
    getTitelEl,
    getContainerForTable,
    getFormEl,
    getInputEl,
    getButtonEl,
    getTableEl,
    getTableTbody
}