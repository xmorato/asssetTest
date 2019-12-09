let game;
let fileToCheck;
let fullSprite;
let frames;
const spriteSheetFrames = new Map();
const frameBorders = new Map();
let cacheImage;
const config = {
    keys: {
        padding: 10
    }
};

function init() {
    game = new Phaser.Game(1280, 760, Phaser.CANVAS, 'phaser', {preload: preload, create: create});
}

function preload() {
    game.load.atlasJSONHash('test', 'assets/sprites/' + fileToCheck + '.png', 'assets/sprites/' + fileToCheck + '.json');
    game.load.image('fullSprite', 'assets/sprites/' + fileToCheck + '.png');
    game.load.bitmapFont('font', 'fonts/numTitlesMenu.png', 'fonts/numTitlesMenu.fnt');
}


function create() {
    cacheImage = game.cache._images["test"];
    frames = game.cache._images["test"].frameData._frames;


    const showSprite = (event) => {
        const currentElement = spriteSheetFrames.get(event.target.innerText);
        showRectangle(currentElement);
    };

    const hideSprite = (event) => {
        const currentElement = spriteSheetFrames.get(event.target.innerText);
        hideBorder(currentElement);
    };


    frames.forEach((asset) => {
        const node = document.createElement("div");
        node.setAttribute('id', asset.name);
        node.classList.add('list-item');
        const textNode = document.createTextNode(asset.name);
        node.appendChild(textNode);
        document.getElementById("results").appendChild(node);

        // Add listeners
        node.addEventListener( "mouseover", showSprite, false);
        node.addEventListener( "mouseout", hideSprite, false);

        drawElement(asset);
    });
}
function drawElement(asset) {
    console.log(asset);
    const currentX = asset.x + (game.world.width / 2 - (cacheImage.data.width / 2));
    const currentY = asset.y + (game.world.height / 2 - (cacheImage.data.height / 2));
    const element = game.add.image(currentX, currentY, 'test', asset.name);
    //element.visible = false;

    // Add event
    element.inputEnabled = true;
    element.events.onInputOver.add(highlightItem, this);
    element.events.onInputOut.add(deemphasizeItem, this);

    spriteSheetFrames.set(asset.name, element);
}

function showRectangle(selectedFrame) {
    if ( frameBorders.has(selectedFrame.name) ) { // If border already exists
        const currentBorder = frameBorders.get(selectedFrame._frame.name);
        currentBorder.alpha = 1;
        currentBorder.worldalpha = 1;
    } else {
        addBorder(selectedFrame);
    }
}

function hideBorder(selectedFrame) {
    frameBorders.get(selectedFrame._frame.name).alpha = 0;
    frameBorders.get(selectedFrame._frame.name).worldAlpha = 0;
}

function addBorder (selectedFrame) {
    const graphics = game.add.graphics(0, 0);
    graphics.lineStyle(2, 0xFFFFFF, 1);  // width, color, alpha
    graphics.drawRect(selectedFrame.x, selectedFrame.y, selectedFrame._frame.width, selectedFrame._frame.height);
    frameBorders.set(selectedFrame._frame.name, graphics);
}

function highlightItem (sprite) {
    const itemId = sprite._frame.name;
    document.getElementById(itemId).classList.add('selected');
}

function deemphasizeItem(sprite) {
    const itemId = sprite._frame.name;
    document.getElementById(itemId).classList.remove('selected');
}

/*function handleFiles (files) {
    console.log(files);
}*/

/*function handleFiles(files) {
    if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        const list = document.createElement("ul");
        fileList.appendChild(list);
        for (let i = 0; i < files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");
            img.src = window.URL.createObjectURL(files[i]);
            console.log(img.src);
            img.height = 60;
            img.onload = function() {
                window.URL.revokeObjectURL(this.src);
            };
            console.log(img);
            li.appendChild(img);
            const info = document.createElement("span");
            info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
            li.appendChild(info);
        }
    }
}*/

window.onload = function comeOn() {

    /*const fileSelect = document.getElementById("fileSelect"),
        fileElem = document.getElementById("fileElem"),
        fileList = document.getElementById("fileList");

    fileSelect.addEventListener("click", function (e) {
        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
    }, false);*/


    fileToCheck = prompt("Please enter file name without extension", "paytable");
    document.getElementById('fileName').innerText = '- Checking: ' + fileToCheck;
    init();
};