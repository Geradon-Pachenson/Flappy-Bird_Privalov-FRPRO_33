

export default class Pipe {
    constructor() {
        
    }
    getHeightUp() {
        return Math.floor(Math.random() * (this._heightMax - this._heightMin + 1)) + this._heightMin;
    }
    getHeightDown(heightUp) {
        return this._heightSum - heightUp;
    }
    isOnPoint(pipeCoor, point) {
        return (pipeCoor % point <= this._moveSpeed) && (pipeCoor % point >= 0) && (pipeCoor / point < 2);
    }
    newPipe() {
        const heightUp = this.getHeightUp();
        const heightDown = this.getHeightDown(heightUp);
        const yDown = this._fieldHeight - heightDown;
        this._pipes.push({
            x: this._x,
            yDown: yDown,
            heightUp: heightUp,
            heightDown: heightDown,
        });
    }
    update() {
        if (this._pipes.length == 0) {
            this.newPipe();
        }

        const lastPipeCoor = this._pipes[this._pipes.length - 1].x;
        if (this.isOnPoint(lastPipeCoor, this._spawnPoint)) {
            this.newPipe();
        }

        for (let i = 0; i < this._pipes.length; i++) {
            this.draw(i);

            this._pipes[i].x -= this._moveSpeed;
            
            const pipeMidpointCoor = this._pipes[i].x + this._width / 2;
            if (this.isOnPoint(pipeMidpointCoor, this._scorePoint) && (pipeMidpointCoor >= this._scorePoint)) {
                this._score.increaseScore();

                // УВЕЛИЧЕНИЕ СЛОЖНОСТИ 
                if (this._score.currentScore == 10 || this._score.currentScore % 50 == 0 && this._score.currentScore > 0) {
                    this._moveSpeed += 0.5;
                }
            }

            const pipeLastpointCoor = this._pipes[i].x + this._width;
            if (pipeLastpointCoor < 0) {
                this._pipes.shift();
            }

            this.pipeLeftCoor = this._pipes[i].x + this._padding;
            this.pipeRightCoor = this._pipes[i].x + this._width - this._padding;
            this.pipeUpBottomCoor = this._yUp + this._pipes[i].heightUp - this._padding;
            this.pipeDownTopCoor = this._pipes[i].yDown + this._padding;
        }

    }
    draw(index) {
            this._drawEngine.draw(
                this._imgDown, 
                this._pipes[index].x, 
                this._pipes[index].yDown, 
                this._width, 
                this._pipes[index].heightDown,
            )
            this._drawEngine.draw(
                this._imgUp, 
                this._pipes[index].x, 
                this._yUp, 
                this._width,
                this._pipes[index].heightUp,
            )
    }
    hittedBird(bird) {
        const birdLeftCoor = bird.x;
        const birdRightCoor = bird.x + bird.width;
        const birdTopCoor = bird.y;
        const birdBottomCoor = bird.y + bird.height;

        if (
            (birdRightCoor >= this.pipeLeftCoor) &&
            (birdLeftCoor <= this.pipeRightCoor) &&
            (birdTopCoor <= this.pipeUpBottomCoor || birdBottomCoor >= this.pipeDownTopCoor)
        ) {
            return true;
        }
        return false;
    }
}