async function refresh() {
    if (GameInfo.game.player.state == "Waiting") {
        // Every time we are waiting
        await getGameInfo();
        await getBoardInfo();
        // The moment we pass from waiting to play
        GameInfo.prepareUI();
    }
    // Nothing to do when we are playing since we control all that happens 
    // so no update is needed from the server
}

function preload() {
    // Card Images

    GameInfo.images.cards = [
        loadImage('assets/images/1.png'),
        loadImage('assets/images/2.png'),
        loadImage('assets/images/3.png'),
        loadImage('assets/images/4.png'),
        loadImage('assets/images/5.png'),
        loadImage('assets/images/6.png'),
        loadImage('assets/images/7.png'),
        loadImage('assets/images/8.png'),
        loadImage('assets/images/9.png'),
        loadImage('assets/images/10.png'),
        loadImage('assets/images/11.png'),
        loadImage('assets/images/12.png'),
        loadImage('assets/images/13.png'),
        loadImage('assets/images/14.png'),
        loadImage('assets/images/15.png'),
        loadImage('assets/images/16.png'),
        loadImage('assets/images/17.png'),
        loadImage('assets/images/18.png'),
        loadImage('assets/images/19.png'),
        loadImage('assets/images/20.png'),
        loadImage('assets/images/21.png'),
        loadImage('assets/images/22.png'),
        loadImage('assets/images/23.png'),
        loadImage('assets/images/24.png'),
        loadImage('assets/images/25.png'),
        loadImage('assets/images/26.png'),
        loadImage('assets/images/27.png'),
        loadImage('assets/images/28.png'),
        loadImage('assets/images/29.png')

    ]

    GameInfo.images.gold = loadImage('assets/images/Gold.png');

    GameInfo.images.cardBacks = [
        loadImage('assets/images/CommonCardBack.png'),
        loadImage('assets/images/RareCardBack.png'),
        loadImage('assets/images/LegCardBack.png')
    ]

    // Fonts
    GameInfo.fonts.CardFont = loadFont('assets/fonts/Minecraft.ttf');
    GameInfo.fonts.CombatFont = loadFont('assets/fonts/OldLondon.ttf');

    // Sounds
    GameInfo.sounds.CardPlayed = loadSound('assets/sounds/CardPlayed.mp3');
    GameInfo.sounds.Combat = loadSound('assets/sounds/Combat.mp3');
    GameInfo.sounds.Button = loadSound('assets/sounds/Button.mp3');
    GameInfo.sounds.BuyCard = loadSound('assets/sounds/BuyCard.mp3');
    GameInfo.sounds.FrontMenu = loadSound('assets/sounds/FrontMenu.mp3');
    GameInfo.sounds.BackGround = loadSound('assets/sounds/BackGround.mp3');
    GameInfo.sounds.EndGame = loadSound('assets/sounds/EndGame.mp3');
    GameInfo.sounds.BuyUpgrade = loadSound('assets/sounds/Gold.mp3');
}

async function cancel() {
    try {
        let result = await requestCancelMatch();
        if (result.successful)
            window.location.pathname = "matches.html"
        else
            window.location.pathname = "matches.html"
    } catch (err) {
        console.log(err);
    }
}


async function setup() {
    let canvas = createCanvas(GameInfo.width, GameInfo.height);
    canvas.parent('game');

    await getGameInfo();
    await getBoardInfo();
    setInterval(refresh, 2000);

    // buttons (create a separated function if they are many)
    GameInfo.endturnButton = createButton('End Turn');
    GameInfo.endturnButton.parent('game');
    GameInfo.endturnButton.position(GameInfo.width - 150, GameInfo.height - 70);
    GameInfo.endturnButton.mousePressed(endturnAction);
    GameInfo.endturnButton.addClass('game');

    GameInfo.endButton = createButton('Return to Menu');
    GameInfo.endButton.parent('game');
    GameInfo.endButton.position(950, GameInfo.height - 50);
    GameInfo.endButton.mousePressed(cancel);
    GameInfo.endButton.addClass('game');

    GameInfo.drawCommonCard = createButton('Common Card - 4 Gold');
    GameInfo.drawCommonCard.parent('game');
    GameInfo.drawCommonCard.position(GameInfo.width - 300, GameInfo.height / 2 - 300);
    GameInfo.drawCommonCard.mousePressed(drawCommonCard);
    GameInfo.drawCommonCard.addClass('game');

    GameInfo.drawEpicCard = createButton('Epic Card - 6 Gold');
    GameInfo.drawEpicCard.parent('game');
    GameInfo.drawEpicCard.position(GameInfo.width - 300, 200);
    GameInfo.drawEpicCard.mousePressed(drawEpicCard);
    GameInfo.drawEpicCard.addClass('game');

    GameInfo.drawLegendaryCard = createButton('Legendary Card - 12 Gold');
    GameInfo.drawLegendaryCard.parent('game');
    GameInfo.drawLegendaryCard.position(GameInfo.width - 300, 270);
    GameInfo.drawLegendaryCard.mousePressed(drawLegendaryCard);
    GameInfo.drawLegendaryCard.addClass('game');

    GameInfo.upgradeMine = createButton('Upgrade Mine - 5 Gold');
    GameInfo.upgradeMine.parent('game');
    GameInfo.upgradeMine.position(GameInfo.width - 300, 400);
    GameInfo.upgradeMine.mousePressed(upgradeMine);
    GameInfo.upgradeMine.addClass('game');

    GameInfo.prepareUI();

    GameInfo.loading = false;
}

function draw() {
    background("#5F3127");
    if (!GameInfo.sounds.BackGround.isPlaying()) {
        GameInfo.sounds.BackGround.play();
    }
    if (GameInfo.loading) {
        textAlign(CENTER, CENTER);
        textSize(40);
        fill('black');
        text('Loading...', GameInfo.width / 2, GameInfo.height / 2);
    } else if (GameInfo.game.state == "Finished" && GameInfo.scoreWindow) {
        GameInfo.scoreWindow.draw();
    } else if (GameInfo.game.state == "Started") {
        GameInfo.scoreBoard.draw();

        GameInfo.playerHand.draw();
        GameInfo.playerHand.updateDrag();
        GameInfo.oppHand.draw();

        GameInfo.playerBoard.draw();
        GameInfo.playerBoard.updateDrag();
        GameInfo.oppBoard.draw();

    } else {
        GameInfo.scoreBoard.draw();

        GameInfo.playerHand.draw();
        GameInfo.playerHand.updateDrag();
        GameInfo.oppHand.draw();

        GameInfo.playerBoard.draw();
        GameInfo.oppBoard.draw();
    }
}

async function mousePressed() {
    if (GameInfo.playerHand) {
        GameInfo.playerHand.press();
    }
}

async function mouseReleased() {
    if (GameInfo.playerHand) {
        await GameInfo.playerHand.release();
    }
}