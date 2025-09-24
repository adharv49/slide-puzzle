import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
const messageEl = document.getElementById('message');
const game = new Game(canvas,messageEl);

game.shuffle();
game.startTimer();

canvas.addEventListener('click', e=>{
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX-rect.left;
    const y = e.clientY-rect.top;
    game.handleClick(x,y);
});

document.addEventListener('keydown', e=>{
    game.handleKey(e.key);
});

document.getElementById('newGame').addEventListener('click', ()=>{
    game.board.resetToSolved();
    game.shuffle();
    messageEl.textContent = 'Click tile or press arrow keys to slide.';
    game.startTimer();
});

document.getElementById('reset').addEventListener('click', ()=>{
    game.board.resetToSolved();
    game.moveCount=0;
    document.getElementById('moveCounter').textContent = 0;
    messageEl.textContent = 'Click tile or press arrow keys to slide.';
    game.drawBoard();
    game.startTimer();
});
