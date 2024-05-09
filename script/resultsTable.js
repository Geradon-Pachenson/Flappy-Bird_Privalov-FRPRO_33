import CanvasDrawEngine from "./Engine/CanvasDrawEngine.js"

class ResultTable {
    constructor() {
        this._drawEngine = new CanvasDrawEngine();
        this._config = new Config();
        
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.TableImg = new Image();
        this.TableImg.src = this._config.sprite.url;
    }

    // рисуем таблицу результатов на канвасе
    draw() {
        this._drawEngine.draw(
            this.TableImg,
        
            // Пересчитываем координату по оси X птицы
            // из изображения-источника
            175,
            116,
            224,
            200,
            //из-за угла наклона отрисовку птицы начинаем на -(половину ее размера). Так при наклонах она не смещается по оси у.
            this._config.canvas.width  / 2 - 150,
            180,
            300,
            250,
        );
        console.log(this.TableImg.width);
    };

    
}


export default ResultTable;