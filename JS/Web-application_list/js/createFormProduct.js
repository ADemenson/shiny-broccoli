import * as components from "./components.js"
import { navigate } from "./navigate.js";

// Создание формы для товара
export default function createFormProduct(containerEl) {
    const cardEl = components.getCardEl();

    const titleEl = components.getTitelEl("Добавить запись");

    const formEl = components.getFormEl("productForm");

    const nameProduct = components.getInputEl("text", "nameProduct", "Название товара", "nameProduct");
    const nameShelf = components.getInputEl("text", "nameShelf", "Название полки", "nameShelf");
    const weight = components.getInputEl("number", "weight", "Вес товара", "weight");
    weight.min = "1";
    const dataStorage = components.getInputEl("date", "dataStorage", "дд.мм.гггг", "dataStorage");
    const submitBtn = components.getButtonEl("Добавить запись", "submit", "productForm")
    formEl.append(nameProduct, nameShelf, weight, dataStorage, submitBtn);
    
    cardEl.append(titleEl, formEl);
    containerEl.append(cardEl)
}