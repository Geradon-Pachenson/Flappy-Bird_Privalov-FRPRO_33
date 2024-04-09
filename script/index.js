// import Config from "./config.js"
import Game from "./Game.js"
import Bird from "./Bird.js"

// const game = new Game();


// //Выполняем подготовку к игре и после подготовки запускаем игру
// game.prepare().then(() => {
//     game.start();
// })


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const bird = new Bird(context);

// // объект изображения с ресурсами, которые будем
// // использовать для создания анимаций
// const birdImg = new Image();
// // birdImg.src = "../images/png/bird3.png";

const bgImg = new Image();
bgImg.src = "../images/png//background.png";


// константа для регулирования скорости анимации
const SPEED = 1.3;

// ширина и высота птицы
const SIZE = [70, 70];

// переменная, необходимая для расчёта
// новых координат на каждом кадре
let index = 0;

const render = () => {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    index += 2.2;
    
    // координата по оси Х фонового изображения
    const backgroudX = -((index * SPEED) % 1900);

    // объект, который хотим получить
    // из изображения-источника
    const bgSource = {
        x: 0,
        y: 300,
        width: 1900,
        height: canvas.height,
    };

    // объект, который хотим
    // отобразить на Canvas
    const bgPartOneResult = {
        x: backgroudX + 1900,
        y: 0,
        width: 1900,
        height: canvas.height,
    };

    // вторая часть фонового изображения, которая
    // идёт следом за первой
    const bgPartTwoResult = {
        x: backgroudX,
        y: 0,
        width: 1900,
        height: canvas.height,
    };

    //функция отрисовки первой части фона
    context.drawImage(
        bgImg,
    
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,
    
        bgPartOneResult.x,
        bgPartOneResult.y,
        bgPartOneResult.width,
        bgPartOneResult.height
    );
    
    //функция отрисовки второй части фона
    context.drawImage(
        bgImg,
    
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,
    
        bgPartTwoResult.x,
        bgPartTwoResult.y,
        bgPartTwoResult.width,
        bgPartTwoResult.height
    );

    // запускаем функцию отрисовки птицы
    bird.draw();

    // после завершения расчётов для текущего кадра
    // сразу запускаем выполнение расчётов для следующего 
    window.requestAnimationFrame(render);
};

// как только изображение будет загружено,
// начнётся отрисовка анимаций
//НЕ ЗАБЫТЬ ИЗМЕНИТЬ НА ЗАГРУЗКУ ВСЕХ ДАННЫХ ПОТОМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
bgImg.onload = render;


