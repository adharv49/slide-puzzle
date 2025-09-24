export class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.BLANK = null;
        this.tiles = this.getStartingBoard();
    }

    getStartingBoard() {
        let counter = 1;
        const board = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                row.push(counter);
                counter++;
            }
            board.push(row);
        }
        board[this.height - 1][this.width - 1] = this.BLANK;
        return board;
    }

    getTile(x, y) { return this.tiles[y][x]; }
    setTile(x, y, val) { this.tiles[y][x] = val; }

    getBlankPosition() {
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                if (this.tiles[y][x] === this.BLANK) return { x, y };
        return { x: -1, y: -1 };
    }

    isValidMove(dir) {
        const blank = this.getBlankPosition();
        switch(dir) {
            case 'UP': return blank.y < this.height - 1;
            case 'DOWN': return blank.y > 0;
            case 'LEFT': return blank.x < this.width - 1;
            case 'RIGHT': return blank.x > 0;
        }
        return false;
    }

    makeMove(dir) {
        const blank = this.getBlankPosition();
        let tx = blank.x, ty = blank.y;
        switch(dir) {
            case 'UP': ty++; break;
            case 'DOWN': ty--; break;
            case 'LEFT': tx++; break;
            case 'RIGHT': tx--; break;
        }
        if (tx>=0 && tx<this.width && ty>=0 && ty<this.height){
            const tmp = this.getTile(tx, ty);
            this.setTile(blank.x, blank.y, tmp);
            this.setTile(tx, ty, this.BLANK);
        }
    }

    resetToSolved() { this.tiles = this.getStartingBoard(); }

    isSolved() {
        let count = 1;
        for (let y=0; y<this.height; y++)
            for (let x=0; x<this.width; x++){
                if (y===this.height-1 && x===this.width-1) return true;
                if (this.tiles[y][x] !== count) return false;
                count++;
            }
        return true;
    }

    getRandomMove(lastMove=null){
        const moves = ['UP','DOWN','LEFT','RIGHT'];
        const valid = moves.filter(m=>this.isValidMove(m) && m!==lastMove);
        return valid[Math.floor(Math.random()*valid.length)];
    }
}
