//Создаём список ul, в который будем помещать товары//

const listEl = document.createElement("ul")

//Создадим массив с товарами//

const goods = ["Арбуз", "Книга", "Утюг", "Картофель", "Макароны" ]

//Создаём функцию, которая будет создавать список с товарами //

function renderList (arr) {
    listEl.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        const liEl = document.createElement("li")
        liEl.textContent = `${i + 1}) ${arr[i]}`
        listEl.append(liEl)
    }
    document.body.append(listEl)
}

//Создаём функцию, которая будет сортировать товары по возрастанию //

function sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length-1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr [j]
                arr [j] = arr [j + 1]
                arr [j + 1] = temp
            }
        }
    }
    return arr
}

//Создаём кнопку 'Добавить товар'//

const addProductbtn = document.createElement("button")
addProductbtn.textContent = "Добавить товар"
document.body.append(addProductbtn)

//Добавляем функционал кнопке//

addProductbtn.onclick = function () {
    // const newProduct = prompt("Введите название товара")
    const newProduct = (word => word.charAt(0).toUpperCase() + word.slice(1))(prompt("Введите название товара:"));
    if (!newProduct) {
        alert("Название товара не введено!")        
    } else {
        goods.push(newProduct)
        renderList(sort(goods))
    }
}

renderList(sort(goods))
