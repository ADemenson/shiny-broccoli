import * as components from "./components.js"
import { navigate } from "./navigate.js";

export default function createProductTable(containerEl) {
    const cardEl = components.getCardEl();
    const containerForTable = components.getContainerForTable();
    const titleEl = components.getTitelEl("Склад");
    const addBtn = components.getButtonEl("Добавить запись");
    containerForTable.append(titleEl, addBtn);

    addBtn.addEventListener('click', function () {
        navigate();
    });

    const tableEl = components.getTableEl();
    const tBodyEl = components.getTableTbody("product-tbody");
    tableEl.appendChild(tBodyEl)

    cardEl.append(containerForTable, tableEl);
    containerEl.append(cardEl);
}