import Config from "./config.js"
import Game from "./Game.js"
import Bird from "./Bird.js"
import Background from "./Background.js"
import CanvasDrawEngine from "./CanvasDrawEngine.js"

// const game = new Game();


// //Выполняем подготовку к игре и после подготовки запускаем игру
// game.prepare().then(() => {
//     game.start();
// })



const bird = new Bird();
const config = new Config();
const bg = new Background();
const drawEngine = new CanvasDrawEngine();


// константа для регулирования скорости анимации
const SPEED = 1.3;

const render = () => {
    drawEngine.clear();
    config.increaseInd();
    
    // // координата по оси Х фонового изображения
    // const backgroudX = -((index * SPEED) % 1900);

    // // объект, который хотим получить
    // // из изображения-источника
    // const bgSource = {
    //     x: 0,
    //     y: 300,
    //     width: 1900,
    //     height: canvas.height,
    // };

    // // объект, который хотим
    // // отобразить на Canvas
    // const bgPartOneResult = {
    //     x: backgroudX + 1900,
    //     y: 0,
    //     width: 1900,
    //     height: canvas.height,
    // };

    // // вторая часть фонового изображения, которая
    // // идёт следом за первой
    // const bgPartTwoResult = {
    //     x: backgroudX,
    //     y: 0,
    //     width: 1900,
    //     height: canvas.height,
    // };

    // запускаем функцию отрисовки фона
    bg.draw();

    // запускаем функцию отрисовки птицы
    bird.draw();

    // после завершения расчётов для текущего кадра
    // сразу запускаем выполнение расчётов для следующего 
    window.requestAnimationFrame(render);
    console.log(config.index);
};

render();

// как только изображение будет загружено,
// начнётся отрисовка анимаций
//НЕ ЗАБЫТЬ ИЗМЕНИТЬ НА ЗАГРУЗКУ ВСЕХ ДАННЫХ ПОТОМ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// bgImg.onload = render;


