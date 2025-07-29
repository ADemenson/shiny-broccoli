// Реализиуем функцию сортировки
const sortOrder = 1; // Сортировка по возрастанию

export function sortTable(columnIndex) {
    const tbody = document.getElementById('product-tbody');
    const rows = Array.from(tbody.querySelectorAll('tr')); // Формируем массив из элементов строк

    // Получаем тип данных первого элемента для определения способа сортировки
    const sampleCell = rows[0]?.cells[columnIndex]?.textContent.trim();
    const isDate = !isNaN(Date.parse(sampleCell)) // Является ли содержимое датой
    const isNumber = !isNaN(parseFloat(sampleCell)) && isFinite(sampleCell) // Является ли содержимое числов, isFinita отсеивает infinity и NaN

    rows.sort((a, b) => {
        const textA = a.cells[columnIndex]?.textContent.trim() || '';
        const textB = b.cells[columnIndex]?.textContent.trim() || '';

        if (isDate) {
            return (new Date(textA) - new Date(textB)) * sortOrder;
        } else if (isNumber) {
            return (parseFloat(textA) - parseFloat(textB)) *sortOrder;
        }

        return textA.localeCompare(textB) * sortOrder;
    });

    // Очищаем и перерисовываем таблицу
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}