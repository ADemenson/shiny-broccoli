//Создаём список ul, в который будем помещать рост учеников//

const listEl = document.createElement("ul")

const height = ["150", "190", "200"] //Массив с ростом учеников//

//Создаём функцию, которая будет добавлять элементы li в список ul//

function renderList(arr) {
    listEl.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        const liEl = document.createElement("li")
        liEl.textContent = `${i + 1}) ${arr[i]}`
        listEl.append(liEl)
    }
    document.body.append(listEl)
}

//Создаём кнопки 'Добавить рост' и 'Фильтровать' соответственно//

const addHeightBtn = document.createElement("button")
addHeightBtn.textContent = "Добавить рост"
addHeightBtn.classList.add("add-height")
document.body.append(addHeightBtn)

const filterBtn = document.createElement("button")
filterBtn.textContent = "Фильтровать"
filterBtn.classList.add("filter")
document.body.append(filterBtn)

//Добавляем клик кнопке 'Добавить рост'//

addHeightBtn.onclick = function () {

    const newHeight = prompt("Введите рост ученика")

    //Проверяем, чтобы пользователь что-то ввёл//
    if (!newHeight) {
        alert("Рост не введён!")
        return
    }

    //Проверяем есть ли в списке уже такой рост//
    let heightExists = false
    for (let i = 0; i < height.length; i++) {
        if (height[i] === newHeight) {
            heightExists = true
            break
        }
    }

    if (heightExists) {
        alert("Такой возраст уже есть в списке")
    } else {
        height.push(newHeight)
        renderList(height)
    }
}

//Добавляем клик кнопке 'Фильтровать'//

filterBtn.onclick = function () {

    //Создадим переменную, в которой пользовать будет вводить минимальный рост//
    const minHeight = prompt("Введите минимальный рост")
    if (!minHeight) {
        alert("Рост не введён!")
    }

    //Создаём функцию, которая будет фильтровать рост учеников//

    function filter(arr, minHeight) {
        const result = []
        for (const item of arr) {
            if (item >= minHeight) {
                result.push(item)
            }
        }
        return result
    }

    const filterArr = filter(height, minHeight)
    renderList(filterArr)

}


renderList(height)
