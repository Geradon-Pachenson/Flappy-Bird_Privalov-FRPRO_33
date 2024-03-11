
class Asset {
    constructor() {
        this.imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

        // инициализируем canvas
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");

        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.img = new Image();
        this.img.src = imgURL;
    }
    
}



export default Asset;