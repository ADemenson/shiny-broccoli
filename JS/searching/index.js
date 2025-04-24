const listEl = document.createElement ("ul")

//Создаём массив из книг//

const books = ["Дюна", "Гэм", "Мастер и Маргарита"]

//Создаём функцию, которая сделает из массива список//

function renderList (arr) {
    listEl.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        const liEl =document.createElement("li")
        liEl.textContent = `${i + 1}) ${arr[i]}`
        listEl.append(liEl)
    }
    document.body.append(listEl)
}

//Создаём кнопки 'Добавить книгу' и 'Найти', создавая им класс для стилизации //

const addBookBtn = document.createElement("button")
addBookBtn.textContent = "Добавить книгу"
addBookBtn.classList.add("add-Book")
document.body.append(addBookBtn)

const findBookBtn = document.createElement("button")
findBookBtn.textContent = "Найти"
findBookBtn.classList.add("find-Book")
document.body.append(findBookBtn)

//Создаём функцию, которая будет добавлять новую книгу//

addBookBtn.onclick = function () {
    
    const newBook = prompt("Введите название книги")

    //Проверяем, что ввёл пользователь, если пустая строчка, то попросить ввести заново//

    if (!newBook) {
        alert("Название книги не введено!")     
    }else {
    books.push(newBook)
    renderList(books)
    }
    //Решил сделать, чтобы при добавлении новой книги, список менялся полностью, но не считаю это совсем верным решением//
}

//Создаём функцию, которая будет искать книгу//

findBookBtn.onclick = function () {

    //Создаём саму функцию, которая будет искать книгу //

    function find (arr, search) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === search) {
                return i               
            }
        }
        return -1
    }

    //Используем функцию find , чтобы найти книгу и покрасить её в красный цвет, либо вывести надпись 'книга не найдена'//

    const book = (word => word.charAt(0).toUpperCase() + word.slice(1))(prompt("Введите книгу для поиска"))

    const findBook = find (books, book)
    if (findBook > -1) {
        document.querySelector(`li:nth-child(${findBook + 1})`).style.cssText = "background-color: green; width: 400px;";
    } else {
        alert("Книга не найдена!")
    }
}

renderList(books)
