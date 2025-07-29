import { navigate } from "./navigate.js";
import { sortTable } from "./sort.js"

// Функция обрабатывания продуктов
function handleFormSubmit(e) {
    e.preventDefault();
    const nameProduct = document.querySelector('#nameProduct').value;
    const nameShelf = document.querySelector('#nameShelf').value;
    const weight = document.querySelector('#weight').value;
    const dataStorage = document.querySelector('#dataStorage').value;

    const product = {
        id: Date.now(),
        nameProduct,
        nameShelf,
        weight,
        dataStorage
    }

    addProduct(product);
    navigate("table");
}

// Реализуем функцию добавления товара
function addProduct(product) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    renderTable()
}

// Функция для отрисовки таблицы
function renderTable(products) {
    products = products || JSON.parse(localStorage.getItem("products")) || [];
    // Пытаемся найти таблицу
    const productTableBody = document.querySelector('#product-tbody');
    // Если не найдено, ждём и пробуем снова
    if (!productTableBody) {
        setTimeout(() => renderTable(products), 100);
        return;
    }
    productTableBody.innerHTML = "";

    products.forEach((product) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.nameProduct}</td>
            <td>${product.nameShelf}</td>
            <td>${product.weight}</td>
            <td>${product.dataStorage}</td>
            <td><button class="delete-btn" data-id="${product.id}">Удалить</button></td>
        `;
        productTableBody.append(row)
    });

    // Обработчик кнопки
    addButtonEventListener();
    // Реализуем функцию сортировки при клике на шапку таблицы
    document.querySelectorAll('.product-table th').forEach((th, index) => {
        th.addEventListener('click', () => {
            sortTable(index); // Функция сортировки по индексу столбца
        });
    });
}

// Обработчик для кнопки
function addButtonEventListener() {
    // Обработчки для кнопки удалить
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (confirm("Удалить товар?")) deleteProduct(id);
        })
    });
}

// Функция удаления продукта
function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products = products.filter(p => p.id != id);
    localStorage.setItem("products", JSON.stringify(products));
    renderTable();
}

export {
    handleFormSubmit,
    addProduct,
    renderTable,
    addButtonEventListener,
    deleteProduct
}