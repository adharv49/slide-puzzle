import { Board } from './board.js';

export class Game {
    constructor(canvas, messageEl) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.messageEl = messageEl;

        this.BOARD_SIZE = 4;
        this.TILE_SIZE = canvas.width / this.BOARD_SIZE;
        this.board = new Board(this.BOARD_SIZE, this.BOARD_SIZE);

        this.moveCount = 0;
        this.timer = 0;
        this.timerInterval = null;

        this.colors = {
            TILE: '#00cc00',
            TEXT: '#ffffff',
            BG: '#03364a',
            BORDER: '#0032ff'
        };

        this.drawBoard();
    }

    drawBoard() {
        this.ctx.fillStyle = this.colors.BG;
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        for (let y=0;y<this.BOARD_SIZE;y++){
            for (let x=0;x<this.BOARD_SIZE;x++){
                const val = this.board.getTile(x,y);
                if (val!==null){
                    const left = x*this.TILE_SIZE;
                    const top = y*this.TILE_SIZE;
                    this.ctx.fillStyle = this.colors.TILE;
                    this.ctx.fillRect(left+1,top+1,this.TILE_SIZE-2,this.TILE_SIZE-2);

                    this.ctx.fillStyle = this.colors.TEXT;
                    this.ctx.font = `${this.TILE_SIZE/2}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(val, left+this.TILE_SIZE/2, top+this.TILE_SIZE/2);
                }
            }
        }

        // Border
        this.ctx.strokeStyle = this.colors.BORDER;
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(0,0,this.canvas.width,this.canvas.height);
    }

    handleClick(x,y){
        const tileX = Math.floor(x/this.TILE_SIZE);
        const tileY = Math.floor(y/this.TILE_SIZE);
        const blank = this.board.getBlankPosition();
        let dir = null;

        if (tileX===blank.x+1 && tileY===blank.y) dir='LEFT';
        else if (tileX===blank.x-1 && tileY===blank.y) dir='RIGHT';
        else if (tileX===blank.x && tileY===blank.y+1) dir='UP';
        else if (tileX===blank.x && tileY===blank.y-1) dir='DOWN';

        if (dir) this.moveTile(dir);
    }

    handleKey(key){
        const keyMap = {ArrowUp:'UP',ArrowDown:'DOWN',ArrowLeft:'LEFT',ArrowRight:'RIGHT'};
        const dir = keyMap[key];
        if(dir && this.board.isValidMove(dir)) this.moveTile(dir);
    }

    moveTile(dir){
        this.board.makeMove(dir);
        this.moveCount++;
        document.getElementById('moveCounter').textContent = this.moveCount;
        if(this.board.isSolved()){
            this.messageEl.textContent = '🎉 Puzzle solved!';
            this.messageEl.style.color = 'black'; 
            clearInterval(this.timerInterval);
        }
        else {
        this.messageEl.textContent = 'Click tile or press arrow keys to slide.';
        this.messageEl.style.color = 'black';
    }
        this.drawBoard();
    }

    shuffle(steps=80){
        let last=null;
        for(let i=0;i<steps;i++){
            const m = this.board.getRandomMove(last);
            this.board.makeMove(m);
            last = m;
        }
        this.moveCount=0;
        document.getElementById('moveCounter').textContent = 0;
        this.drawBoard();
    }

    startTimer(){
        clearInterval(this.timerInterval);
        this.timer=0;
        this.timerInterval=setInterval(()=>{
            this.timer+=1;
            const m = String(Math.floor(this.timer/60)).padStart(2,'0');
            const s = String(this.timer%60).padStart(2,'0');
            document.getElementById('timer').textContent = `${m}:${s}`;
        },1000);
    }
}
