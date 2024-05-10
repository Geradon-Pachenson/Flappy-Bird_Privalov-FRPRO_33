
class ResultTable {
    constructor(params) {
        this._drawEngine = params.drawEngine;
        this._config = params.config;
        
        // объект изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.TableImg = new Image();
        this.TableImg.src = this._config.sprite.url;
    }

    // рисуем таблицу результатов на канвасе
    draw() {
        this._drawEngine.draw(
            this.TableImg,
        
            175,
            116,
            224,
            200,
            
            this._config.canvas.width  / 2 - 150,
            180,
            300,
            250,
        );
    };
}


export default ResultTable;