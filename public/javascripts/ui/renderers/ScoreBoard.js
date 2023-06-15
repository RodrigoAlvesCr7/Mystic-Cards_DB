
class ScoreBoard {
    static width = 300;
    static height = 100;
    static x = 10;
    static y = 10;
    constructor(game, board) {
        this.game = game;
        this.board = board;
        this.pinfo = GameInfo.board.player.info[0][0][0];
        this.oppinfo = GameInfo.board.opponents[0].info[0][0][0];
    }
    draw() {
        fill(255, 230, 0);
        stroke(0, 0, 0);
        fill(255, 0, 0);
        textAlign(LEFT, CENTER);
        textSize(40);
        textFont(GameInfo.fonts.CombatFont);
        textStyle(BOLD);
        text("Turn: " + this.game.turn, 20, 370);

        text(this.game.player.name, ScoreBoard.x + 10, 750);
        text(this.game.opponents[0].name, ScoreBoard.x + 10, 30);

        text(this.oppinfo.hp, 25, 200);
        text(this.pinfo.hp, 25, 550);

        text("x" + this.pinfo.gold, 1400, 20);
        console.log(this.oppinfo)

        // text("x4", 1370, 110);
        // text("x6", 1320, 162);
        // text("x12", 1380, 212);


        image(GameInfo.images.gold, 1330, 10, 50, 50);

        const ctx = canvas.getContext("2d");

        // health bars

        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(100, 700, 20, - 300);
        ctx.strokeRect(100, 350, 20, - 300);


        if (this.pinfo.hp < 51 && this.pinfo.hp > 40) {
            let color = "#33cc33";
            ctx.fillStyle = color;
        } else if (this.pinfo.hp < 40 && this.pinfo.hp > 20) {
            let color = "#ff9933";
            ctx.fillStyle = color;
        } else if (this.pinfo.hp < 20) {
            let color = "#cc0000";
            ctx.fillStyle = color;
        }
        ctx.strokeStyle = "black";
        let healthBarHeightPer = (this.pinfo.hp / 50);


        ctx.fillRect(100, 700, 20, (-300 * healthBarHeightPer));


        if (this.oppinfo.hp < 51 && this.oppinfo.hp > 40) {
            let color = "#33cc33";
            ctx.fillStyle = color;

        } else if (this.oppinfo.hp < 41 && this.oppinfo.hp > 20) {
            let color = "#ff9933";
            ctx.fillStyle = color;

        } else if (this.oppinfo.hp < 21) {
            let color = "#cc0000";
            ctx.fillStyle = color;

        }

        ctx.fillStyle = color;
        ctx.strokeStyle = "black";
        let oppHealthBarHeightPer = (this.oppinfo.hp / 50);

        ctx.fillRect(100, 350, 20, (-300 * oppHealthBarHeightPer));



        if (this.game.state == "Finished") {
            fill(200, 0, 0);
            textSize(24);
            textStyle(BOLD);
            textAlign(CENTER, CENTER);
            text("GAMEOVER", ScoreBoard.x + 200, ScoreBoard.y - 5 + ScoreBoard.height / 4)
        }
    }

    update(game, board) {
        this.game = game;
        this.board = board;
        this.pinfo = GameInfo.board.player.info[0][0][0];
        this.oppinfo = GameInfo.board.opponents[0].info[0][0][0];
    }


}