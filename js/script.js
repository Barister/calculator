// to determine variables

let currentNumber = 0;
let previousNumber = null;
let operator = null;
let lastOperator = null;
let historyDisplay = '';
let switcherOperate = false;
let switcherEquals = false;
let switcherToggle = false;
let toShowNumber = null;
let lastNumber = null;

const displayNumber = document.querySelector('.display__main');
const displayHistory = document.querySelector('.display__history');
const allButtons = document.querySelector('.calc__buttons');


// to add input EventListener to restrict maxlength of displayNumber
displayNumber.addEventListener('input', event => {
    const maxLength = event.target.maxLength;
    let currentValue = parseInt(event.target.value);
    let currentValueStr = currentValue.toString();

    if (currentValueStr.length > maxLength) {
        event.target.value = currentValue.toExponential(maxLength - 6);
        currentNumber = event.target.value;
    }
});

//to choose the function depending button's class click
const listenToButtons = function (event) {
    if(event.target.closest('button')) {
        let clickedClass = event.target.closest('button').classList.value;
        let clickedId = event.target.closest('button').id;
        
        switch (clickedClass) {
            case 'button__operate':
                operateButton(event.target.closest('button').innerText);
                break;
            case 'button__clear':
                clearButton();
                break;
            case 'button__int':
                numberButton(parseInt(clickedId));
                break;
            case 'button__toggle':
                toggleButton();
                break;
            case 'button__point':
                pointButton();
                break;
            case 'button__equals':
                equals();
                break;
            case 'button__backspace': 
                backspaceButton();
                break;
        }
        
    }
}

//if pressed numbers calc does. Sorry for all that branches
function numberButton(button) {

    if (switcherOperate === false && switcherEquals === true) {
        switcherEquals = false;
        currentNumber = button;
        historyDisplay = previousNumber + ' ' + operator;
        showHistory();
    }

    else if (switcherOperate === true) {
        currentNumber = button;
        switcherOperate = false;
    }

    else if (switcherEquals === true) {
        currentNumber = button;
        switcherEquals = false;
        historyDisplay = '';
        showHistory();
    }

    else if (displayNumber.value.includes('.')) {
        currentNumber = displayNumber.value + button;
    }

    else {
        currentNumber = parseInt(`${currentNumber}${button}`);
    }

    showDisplayNumber();
    currentNumber = parseFloat(currentNumber);
}


// to handle a press of operateButtons
function operateButton(button) {

    if (switcherEquals === true) {
        operator = button;
        if (switcherToggle === false) {
            currentNumber = previousNumber;
            historyDisplay = previousNumber + ' ' + operator;
        }
        else if (switcherToggle === true) {
            previousNumber = currentNumber;
            currentNumber = button;
            historyDisplay = previousNumber + ' ' + operator;
            switcherToggle = false;
        }
        showHistory();
        switcherEquals = false;
        switcherOperate = true;
    }

    else if (currentNumber && operator && previousNumber) {
        equals();
        operator = button;
    }

    else if (switcherOperate === false) {
        operator = button;
        previousNumber = currentNumber;
        currentNumber = 0;
        historyDisplay = previousNumber + " " + operator;
        switcherOperate = true;
        showHistory();
    }

    else {
        operator = button;
        historyDisplay = previousNumber + operator;
        showHistory();
    }
}
//some specific buttons
function clearButton(button) {
    operator = null;
    previousNumber = null;
    currentNumber = 0;
    lastNumber = null;
    lastOperator = null;
    historyDisplay = '';
    switcherOperate = false;
    switcherEquals = false;
    displayNumber.style.fontSize = "32px";
    showHistory();
    showDisplayNumber();

}

function toggleButton() {
    if(currentNumber !== 0){

        currentNumber = -displayNumber.value;
        historyDisplay = currentNumber;
        showHistory();
        
    }
    switcherToggle = true;
    showDisplayNumber();
}

function backspaceButton() {
    if (switcherEquals === true){
        historyDisplay = '';
        showHistory();
        return;
    }
    
    else if (currentNumber !== 0) {
        currentNumber = displayNumber.value.toString().split('').slice(0, -1).join('');
        if (currentNumber == '') {
            currentNumber = 0
        }
        showDisplayNumber();
    }
}

function pointButton() {
    if (!displayNumber.value.includes('.')) {
        toShowNumber = displayNumber.value+'.';
        currentNumber = parseFloat(toShowNumber).toFixed(0);
        showDisplayNumber();
    }
}

allButtons.addEventListener('click', event => listenToButtons(event));


function showDisplayNumber () {
    if (toShowNumber !== null) {
        displayNumber.value = toShowNumber;
        toShowNumber = null;
        return;
    }
    else {
        displayNumber.value = currentNumber;
    }
    
    const inputEvent = new Event('input', {bubbles: true});
    displayNumber.dispatchEvent(inputEvent);

}

showDisplayNumber();


//trying to solve issue with memory problems with float numbers in JS feat. ChatGPT
let fixedToLength = 0;

function countDecimalPlaces(num) {
  const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) {
    return 0;
  }
  const fractionalPart = match[1] ? match[1].length : 0;
  const exponent = match[2] ? parseInt(match[2]) : 0;
  return Math.max(0, fractionalPart - exponent);
}

function toCompareNumbers(){
    let currentNumberLength = countDecimalPlaces(currentNumber);
    let previousNumberLength = countDecimalPlaces(previousNumber);

    if (currentNumber % 1 !== 0 || previousNumber % 1 !== 0) {
        if (currentNumberLength >= previousNumberLength) {
            return decimalPlaces = currentNumberLength;
        }
        else if (previousNumberLength > currentNumberLength) {
            return decimalPlaces = previousNumberLength;
        }
    }
    decimalPlaces = 1;

}


//to calc directly
function equals() {
          
    if (currentNumber === 0 && previousNumber === null && operator === null) {
        return;
    }
    else if (!currentNumber) {
        currentNumber = parseInt(displayNumber.value);
    }
    else if(!operator) {
        operator = lastOperator;
    }
    if (lastNumber === null) {
        lastNumber = currentNumber;
    }

    // lets try to know a number of symbols after comma

    toCompareNumbers();    

    switch (operator) {
        case '*': 
            currentNumber *= previousNumber;
            break;
        case '/':
            currentNumber = previousNumber / currentNumber;
            break;
        case '+':
            currentNumber += previousNumber;
            break;
        case '-':
            currentNumber = previousNumber - currentNumber;
            break;
    }
        
    let decimalPlacesAfter = countDecimalPlaces(currentNumber);
    
    if (currentNumber % 1 !== 0 && decimalPlacesAfter > 12) {
        currentNumber = parseFloat(currentNumber.toFixed(decimalPlaces));
    }
    
    else if (currentNumber % 1 === 0 && !currentNumber.toString().includes('e')) {
        currentNumber = parseInt(currentNumber);
    }
    
    toShowNumber = currentNumber;
    historyDisplay = previousNumber + ' ' + operator + ' ' + lastNumber + ' =';
    previousNumber = currentNumber;
    currentNumber = lastNumber;
    switcherEquals = true;
    lastNumber = null;
    lastOperator = operator;
    operator = null;
    
    showDisplayNumber();
    showHistory();
    autoResize();
    
}

//let's try to make historyDisplay

function showHistory () {
    displayHistory.innerText = historyDisplay;
}


//let's try adjust font size if input.value > size of display with ChatGPT help
function autoResize() {
     
    let fontSize = parseInt(getComputedStyle(displayNumber).getPropertyValue("font-size"));
    let width = displayNumber.offsetWidth;
    let textWidth = getTextWidth(displayNumber.value, fontSize + "px " + getComputedStyle(displayNumber).getPropertyValue("font-family"));
    
    while (textWidth+10 > width) {
        fontSize--;
        textWidth = getTextWidth(displayNumber.value, fontSize + "px " + getComputedStyle(displayNumber).getPropertyValue("font-family"));
    }
    
    displayNumber.style.fontSize = fontSize + "px";
}

function getTextWidth(text, font) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}

