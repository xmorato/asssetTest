let game;
let fileToCheck;
const resultKeys = [];

function getResizeValue() {
    const imageWidth = game.cache.getImage("test").width;
    const divWidth = document.getElementById('phaser').offsetWidth;

    let result = 1;

    if ( divWidth < imageWidth ) {
        result = ( divWidth * 100 ) / imageWidth;
    }
    console.log(result);
}

function init() {
    game = new Phaser.Game(1080, 1024, Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update});
}

function preload() {
//    game.load.atlasJSONHash('test', 'assets/sprites/paytable.png', 'assets/sprites/paytable.json');
    game.load.atlasJSONHash('test', 'assets/sprites/'+fileToCheck+'.png', 'assets/sprites/'+fileToCheck+'.json');
    game.load.bitmapFont('font', 'fonts/numTitlesMenu.png', 'fonts/numTitlesMenu.fnt');
}

function create() {
    getResizeValue();
    const objImg = game.cache._images["test"].frameData._frames;
    const pad = 50; //pixel padding
    const colPad = 200;
    const assetPerRow = 16;
    let col = 0;
    let newCol = 0;
    let distance = 0;
    const result = document.getElementById('results');
    objImg.forEach((asset, index) => {
        game.add.bitmapText(newCol, distance, 'font', asset.name, 15);
        game.add.sprite(newCol, distance + 10, 'test', asset.name);
        resultKeys.push(asset.name);
        distance = distance + pad;
        // To "columnize" the stuff
        newCol = Math.floor(index / assetPerRow) * colPad;
        if (newCol !== col) {
            distance = 0;
            col = newCol;
        }
    });
    result.innerText = resultKeys.join(" - ");

    window.game = game;
}

function update() {
}

window.onload = function comeOn() {
    fileToCheck = prompt("Please enter file name without extension", "paytable");
    document.getElementById('fileName').innerText = '- Checking: ' + fileToCheck;
    init();
};