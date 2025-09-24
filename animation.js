export class Animation {
    constructor(game) {
        this.game = game;
        this.isAnimating = false;
    }

    slideAnimation(direction, callback) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Immediately move tile (simple, no smooth slide)
        this.game.board.makeMove(direction);

        if (callback) callback();
        this.isAnimating = false;
    }
}
