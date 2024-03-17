import Config from "./config.js"
import Bird from "./Bird.js"

const spriteSheet = ...;
const physicsEngine = ...;

const bird = new Bird() {
    x: config.bird.x,
    y: config.bird.y,
    width: config.bird.widht,
    height: config.bird.height,
    frames: config.bird.frames,
    spriteSheet,
    flapSpeed: config.bird.flapSpeed,
    physicsEngine,
    drawEngine,
    game,
}














//import Asset from "./Asset.js";


class Main {
    constructor() {
        this.asset = new Asset();
        
    }
    
}

//const main = new Main();

const imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";



// объект изображения с ресурсами, которые будем
// использовать для создания анимаций
const img = new Image();
img.src = imgURL;

// константа для регулирования скорости анимации
const SPEED = 3.1;

// ширина и высота птицы
const SIZE = [51, 36];

// переменная, необходимая для расчёта
// новых координат на каждом кадре
let index = 0;

const render = () => {
    index += 0.3;
    
    // координата по оси Х фонового изображения
    const backgroudX = -((index * SPEED) % canvas.width);

    // объект, который хотим получить
    // из изображения-источника
    const bgSource = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    // объект, который хотим
    // отобразить на Canvas
    const bgPartOneResult = {
        x: backgroudX + canvas.width,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    // вторая часть фонового изображения, которая
    // идёт следом за первой
    const bgPartTwoResult = {
        x: backgroudX,
        y: 0,
        width: canvas.width,
        height: canvas.height,
    };

    //функция отрисовки первой части фона
    ctx.drawImage(
        img,
    
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
    ctx.drawImage(
        img,
    
        bgSource.x,
        bgSource.y,
        bgSource.width,
        bgSource.height,
    
        bgPartTwoResult.x,
        bgPartTwoResult.y,
        bgPartTwoResult.width,
        bgPartTwoResult.height
    );

    // изображение птицы, которое копируем
    // из изображения-источника
    const birdSource = {
        x: 432,
        y: Math.floor((index % 9) / 3) * SIZE[1],
        width: SIZE[0],
        height: SIZE[1],
    };
    console.log(birdSource.y);

    // координаты, по которым птица
    // будет расположена на Canvas
    const birdResult = {
        x: canvas.width / 2 - SIZE[0] / 2,
        y: 300,
        width: SIZE[0],
        height: SIZE[1],
    };
    
    ctx.drawImage(
        img,
    
        birdSource.x,
        birdSource.y,
        birdSource.width,
        birdSource.height,
    
        birdResult.x,
        birdResult.y,
        birdResult.width,
        birdResult.height
    );

    // после завершения расчётов для текущего кадра
    // сразу запускаем выполнение расчётов для следующего 
    window.requestAnimationFrame(render);
};

// как только изображение будет загружено,
// начнётся отрисовка анимаций
img.onload = render;

export default Main;
