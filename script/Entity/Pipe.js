
export default class Pipe {
    constructor(setting) {
        this._drawEngine = setting.drawEngine;
        this._config = setting.config;
        this._physicsEngine = setting.physicsEngine;
        this._score = setting.score;
        this._sounds =  setting.sounds;
        
        // объекты изображения с ресурсами, которые будем
        // использовать для создания анимаций
        this.pipeUp = new Image();
        this.pipeUp.src = this._config.pipe.pipeUpUrl;
        this.pipeBottom = new Image();
        this.pipeBottom.src = this._config.pipe.pipeBottomUrl;
        this.TableImg = new Image();
        this.TableImg.src = this._config.sprite.url;
        
        //Создаём расстояние между трубами и сам массив труб
        this.gap = this._config.pipe.gap;
        this.pipes = [];
        this.pipes[0] = {
            x : this._config.canvas.width,
            //Первый промежуток посередине игры
            y : -this._config.canvas.height / 3,
        }
    }
    
    draw = () => {
        //Если текущая игра запущена, запускаем отрисовку труб
        if (this._config.state.current !== this._config.state.game) {
            return;
        } else {
            for(let i = 0; i < this.pipes.length; i++) {
                //Верхняя труба
                this._drawEngine.draw(
                    this.pipeUp,
                    
                    this._config.pipe.pipeUp.x,
                    this._config.pipe.pipeUp.y,
                    this._config.pipe.pipeUp.width,
                    this._config.pipe.pipeUp.height,

                    this.pipes[i].x, 
                    this.pipes[i].y,
                    this._config.bird.birdCoords.width * 2, //ширина трубы вдвое больше ширины птицы,
                    this._config.pipe.pipeUp.height
                );
                //Нижняя труба
                this._drawEngine.draw(
                    this.pipeBottom,

                    this._config.pipe.pipeBottom.x,
                    this._config.pipe.pipeBottom.y,
                    this._config.pipe.pipeBottom.width,
                    this._config.pipe.pipeBottom.height,
                    
                    this.pipes[i].x, 
                    this.pipes[i].y + this.pipeUp.height + this.gap,
                    this._config.bird.birdCoords.width * 2, //ширина трубы вдвое больше ширины птицы,
                    this._config.pipe.pipeBottom.height
                );

                this.pipes[i].x -= this._config.SPEED;

                //Расстояние между трубами равно ширине трех труб (через каждые четыре ширины трубы или восемь птиц)
                if (this.pipes[this.pipes.length - 1].x <= this._config.canvas.width - this._config.bird.birdCoords.width * 8) {
                    this.pipes.push({
                    x : this._config.canvas.width,
                    y : -this._physicsEngine.getRandomInt(90, 450),
                    });

                    // Проигрываем звук увеличения очков
                    this._sounds.scoreMp3.play();

                    //Увеличиваем колличество очков при появлении новой трубы
                    this._score.increaseScore();

                    // увеличиваем немного скорость и гравитацию каждые 3 очка
                    if (this._score._currentScore % 3 === 0) {
                        this._config.increaseSPEED();
                        this._config.increaseGrav();
                    }
                }
            }
        }
        //Условие очистки массива. Чтобы он не стремился к бесконечности.
        if (this.pipes.length > 3){
            this.pipes.shift()
        }
    }
}