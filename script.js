const maxWidth = 1000;
const maxHeight = 1000;
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

            //TODO update to make that box 10% darker each hover instead of immediatley being black
            gridSquare.addEventListener('mouseenter', (e) => e.target.classList.add("highlighted"));
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

    for (let i = 0; i < n; i++){
        const row = container.firstElementChild;
        
        row.remove();

        container.childNodes.forEach(element => {
            element.firstChild.remove();
        });
    }

    currentSize -= n;
}

function increaseSize(n) {

    const currentRowsCollection = container.children;

    for (let i = 0; i < currentSize; i++){

        const row = currentRowsCollection[i];

        for (let j = 0; j < n; j++){

            const gridSquare = document.createElement('div');
            gridSquare.classList.add('tile');
    
            //TODO update to make that box 10% darker each hover instead of immediatley being black
            gridSquare.addEventListener('mouseenter', (e) => e.target.classList.add("highlighted"));
            //gridSquare.addEventListener('mouseleave', (e) => e.target.classList.remove("highlighted"));
            row.appendChild(gridSquare);
        }
    }

    for (let i = 0; i < n; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        //TODO: Use classes to set row containers as horizontal flex
        for (let j = 0; j < currentSize + n; j++){
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('tile');

            //TODO update to make that box 10% darker each hover instead of immediatley being black
            gridSquare.addEventListener('mouseenter', (e) => e.target.classList.add("highlighted"));
            //gridSquare.addEventListener('mouseleave', (e) => e.target.classList.remove("highlighted"));

            rowContainer.appendChild(gridSquare);
        }

        
        container.appendChild(rowContainer);
    }

    currentSize += n;
}

function clear() {

    for (let i = 0; i < currentSize; i++){

        
        container.removeChild(container.firstChild);
    }
    
    initializePage();


}