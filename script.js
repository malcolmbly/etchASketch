const maxWidth = 1400;
const maxHeight = 800;
let currentSize = 16;
let drawingModeEnabled = false;
let colorMode = "Darken";

const body = document.getElementsByName("body");
const container = document.createElement('div');
// TODO add an event listener for click that "enables" the drawing mode
// when this isn't enabled, the listener for each grid needs to be removed/disabled
// or a boolean inside a function call stops the class from being toggled.
container.classList.add('grid');
document.body.appendChild(container);
initializePage();

function initializePage() {
    
    createNGrid(currentSize);

    const resizeButton = document.querySelector("#resizeBtn");
    resizeButton.addEventListener('click', resize);

    const clearButton = document.querySelector("#clearBtn");
    clearButton.addEventListener('click', clear);

    container.addEventListener('click', toggleDrawingMode);

    const toggleButton = document.querySelector("#toggleBtn");
    toggleButton.addEventListener('click', switchColorMode);
}

function createNGrid(n) {

    for (let i = 0; i < n; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        //TODO: Use classes to set row containers as horizontal flex
        for (let j = 0; j < n; j++){
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('tile');
            
            gridSquare.style.width = Math.round(maxWidth / n) + "px";
            gridSquare.style.height = Math.round(maxHeight / n) + "px";
            

            //TODO update to make that box 10% darker each hover instead of immediatley being black
            // add a darken method that uses (this) reference to update the style on that box.
            gridSquare.addEventListener('mouseenter', changeColor);
            //gridSquare.addEventListener('mouseleave', (e) => e.target.classList.remove("highlighted"));

            rowContainer.appendChild(gridSquare);
        }
        container.appendChild(rowContainer);
    }
}

function resize() {

    const newSize = prompt("What should the new size be?");
    //add input check for integer
    const difference = newSize - currentSize;

    if (difference > 0) {
        increaseSize(difference)
    } else if (difference < 0) {
        decreaseSize(-difference);
    } else {
        return;
    }
    
}

function decreaseSize(n) {

    currentSize -= n;
    for (let i = 0; i < n; i++){
        const row = container.firstElementChild;
        
        row.remove();

        container.childNodes.forEach(element => {
            //for each row, remove the first tile
            element.firstChild.remove();
        })
    }

    //for each row, update the remaining tiles to the new size.
    container.childNodes.forEach(element => {

        element.childNodes.forEach(tile => {
            tile.style.width = Math.round(maxWidth / currentSize) + "px";
            tile.style.height = Math.round(maxHeight / currentSize) + "px";
        })
    });
}

function increaseSize(n) {

    currentSize += n;
    const currentRowsCollection = container.children;
    //update current rows
    for (let i = 0; i < currentSize - n; i++){

        const row = currentRowsCollection[i];

        row.childNodes.forEach(element => {
            element.style.width = Math.round(maxWidth / currentSize) + "px";
            element.style.height = Math.round(maxHeight / currentSize) + "px";
        })

        for (let j = 0; j < n; j++){

            const gridSquare = document.createElement('div');
            gridSquare.classList.add('tile');

            gridSquare.style.width = Math.round(maxWidth / currentSize) + "px";
            gridSquare.style.height = Math.round(maxHeight / currentSize) + "px";
    
            gridSquare.addEventListener('mouseenter', changeColor);
            row.appendChild(gridSquare);
        }
    }

    // add new rows
    for (let i = 0; i < n; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        //TODO: Use classes to set row containers as horizontal flex
        for (let j = 0; j < currentSize; j++){
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('tile');

            gridSquare.style.width = Math.round(maxWidth / currentSize) + "px";
            gridSquare.style.height = Math.round(maxHeight / currentSize) + "px";

            gridSquare.addEventListener('mouseenter', changeColor);
            rowContainer.appendChild(gridSquare);
        }

        
        container.appendChild(rowContainer);
    }


}

function clear() {

    for (let i = 0; i < currentSize; i++){

        container.removeChild(container.firstChild);
    }
    
    initializePage();
}

function changeColor(event) {

    if (colorMode == "Rainbow" && drawingModeEnabled) {
        randomColor(event);
    } else if (colorMode == "Darken" && drawingModeEnabled) {
        darken(event);
    }
}

function darken(event) {

    const currentTile = event.target;
    let currentColor = window.getComputedStyle(currentTile).getPropertyValue('background-color');
    //the above line returns something like "rgb(221,221,221), need to convert to hex."
    currentColor = currentColor.slice(4, -1);
    let colorArray = currentColor.split(', ');
    for (const index in colorArray) {
        colorArray[index] -= Math.round(0.2 * colorArray[index]);
    }
    
    let newColor = "rgb(" + colorArray.toString() + ")";
    currentTile.style.backgroundColor = newColor;
}

function randomColor(event) {

    
    let maxVal = 0xFFFFFF;
    let randomNumber = Math.random() * maxVal;
    while (randomNumber >= 0xEEEEEE) {
        randomNumber = Math.random() * maxVal;
    }
    randomNumber = Math.floor(randomNumber);
    let randomColor = randomNumber.toString(16);
    
    randomColor = `#${randomColor.padStart(6, 0).toUpperCase()}`;   
    const currentTile = event.target;
    
    currentTile.style.backgroundColor = randomColor;
}

function toggleDrawingMode() {
    
    if (drawingModeEnabled) {
        drawingModeEnabled = false;
    } else {
        drawingModeEnabled = true;
    }
}

function switchColorMode(event) {
    
    if (event.target.textContent == "Rainbow Mode") {

        colorMode = "Rainbow";
        event.target.textContent = "Dark Mode";
    } else if (event.target.textContent == "Dark Mode") {

        colorMode = "Darken";
        event.target.textContent = "Rainbow Mode";
    } else {

        colorMode = "Rainbow";
        event.target.textContent = "Dark Mode";
    }
}