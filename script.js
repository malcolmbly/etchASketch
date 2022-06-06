const maxWidth = 1400;
const maxHeight = 800;
let currentSize = 16;

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
            gridSquare.addEventListener('mouseenter', darken);
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
    console.log(currentSize);
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
    
            //TODO update to make that box 10% darker each hover instead of immediatley being black
            gridSquare.addEventListener('mouseenter', darken);
            //gridSquare.addEventListener('mouseleave', (e) => e.target.classList.remove("highlighted"));
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

            //TODO update to make that box 10% darker each hover instead of immediatley being black
            gridSquare.addEventListener('mouseenter', darken);
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

function darken(event) {

    const currentTile = event.target;

}

function randomColor(event) {

    const currentTile = event.target;
}