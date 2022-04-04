/* Задание 2.

Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.  */

let btn = document.querySelector('.btn');
let result = document.querySelector('.output');

let windowWidth = document.documentElement.clientWidth;
let windowHeight = document.documentElement.clientHeight;

btn.addEventListener("click", () => {
    alert(`Ширина экрана: ${windowWidth} px.
Высота экрана: ${windowHeight} px.`)
   })




