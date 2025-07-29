// import { } from "./createFormProduct.js"
import * as components from "./handleFormSubmit.js"

// Файл для навигации
// Орисовка карточки
export async function navigate(cardName) {
    const appEl = document.querySelector('.app');
    appEl.innerHTML = "";

    switch (cardName) {
        case "table":
            const productTable = await import("./createProductTable.js");
            productTable.default(appEl);
            break;
        default:
            const formProduct = await import("./createFormProduct.js")
            formProduct.default(appEl);
            document.querySelector('#productForm').addEventListener('submit', components.handleFormSubmit);
    }
}