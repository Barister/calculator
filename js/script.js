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
    //console.log(maxLength);
    let currentValue = parseInt(event.target.value);
    let currentValueStr = currentValue.toString();

    if (currentValueStr.length > maxLength) {
        console.log('currentValue превысило maxLength:', event.target.value.length);
        event.target.value = currentValue.toExponential(maxLength - 6);
        currentNumber = event.target.value;
    }
});

//to choice the function depending button's class click
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
        console.log('бинго для кнопки цифры');
        switcherEquals = false;
        currentNumber = button;
        historyDisplay = previousNumber + ' ' + operator;
        showHistory();
    }

    else if (switcherOperate === true) {
        currentNumber = button;
        switcherOperate = false;
        console.log("Сработало присвоение cN после switchOperate === true!", 'cN:', currentNumber);
    }

    else if (switcherEquals === true) {
        currentNumber = button;
        switcherEquals = false;
        historyDisplay = '';
        console.log("Сработало присвоение cN после switchEquals === true!");
        showHistory();
    }

    else if (displayNumber.value.includes('.')) {
        console.log('Есть точка в числе!:', displayNumber.value+button);
        currentNumber = displayNumber.value + button;
    }

    else {
        currentNumber = parseInt(`${currentNumber}${button}`);
        console.log("Сработала конкатенация числа!");
    }

    //to restrict maximumNumber

    // if (currentNumber.length > displayNumber.maxLength) {
    //     console.log('currentNumber.length превысило maxLength:');
    //     currentNumber = currentNumber.slice(0,displayNumber.maxLength);
    // }

    showDisplayNumber();
    currentNumber = parseFloat(currentNumber);
    
}


// нажатие кнопки с классом operate запускает функцию
function operateButton(button) {

    //if operator == null , 
    if (switcherEquals === true) {
        console.log('switcherEquals === true');
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
        console.log('operate 2');
        equals();
        operator = button;
    }

    else if (switcherOperate === false) {
        console.log('operate 3');
        operator = button;
        previousNumber = currentNumber;
        currentNumber = 0;
        historyDisplay = previousNumber + " " + operator;
        switcherOperate = true;
        showHistory();
    }

    else {
        console.log('operate 4');
        console.log('Сработал последний вариант в operateButton');
        operator = button;
        historyDisplay = previousNumber + operator;
        showHistory();
    }
}

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
    console.log('сработала toggleButton, currentNumber =', currentNumber);
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
        console.log('backspace currentNumber !== 0')
        currentNumber = displayNumber.value.toString().split('').slice(0, -1).join('');
        if (currentNumber == '') {
            currentNumber = 0
        }
        console.log('currentNumber:', currentNumber);
        showDisplayNumber();
    }
}

function pointButton() {
    if (!displayNumber.value.includes('.')) {
        console.log('точки нет!', 1.);
        toShowNumber = displayNumber.value+'.';
        currentNumber = parseFloat(toShowNumber).toFixed(0);
        console.log('cN после нажатия на точку:', currentNumber);
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

    

    //console.log(displayNumber);
}

showDisplayNumber();

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
            console.log('количество знаков после запятой у cN:', currentNumberLength);
            return decimalPlaces = currentNumberLength;
        }
        else if (previousNumberLength > currentNumberLength) {
            console.log('количество знаков после запятой у pN:', previousNumberLength);
            return decimalPlaces = previousNumberLength;
        }
    }
    decimalPlaces = 1;

}



function equals() {
    console.log('запускаем уравнение');
    console.log('значения переменных в начале equal():', 'pN', previousNumber, 'op', operator, 'cN',currentNumber);
       
    if (currentNumber === 0 && previousNumber === null && operator === null) {
        console.log('сработала равно return');
        return;
    }
    else if (!currentNumber) {
        currentNumber = parseInt(displayNumber.value);
        console.log('присвоили currentNumner значение Экрана:', currentNumber);
    }
    else if(!operator) {
        operator = lastOperator;
        console.log('operator был пустой, взяли значение:', lastOperator);
    }
    if (lastNumber === null) {
        lastNumber = currentNumber
        console.log('lastNumber:', lastNumber);
    };

    // lets try to know a number of simbols after comma

    toCompareNumbers();    

    switch (operator) {
        case '*': 
            console.log('умножение');
            currentNumber *= previousNumber;
            break;
        case '/':
            console.log('divide');
            currentNumber = previousNumber / currentNumber;
            break;
        case '+':
            console.log('sum');
            currentNumber += previousNumber;
            break;
        case '-':
            console.log('subtract');
            currentNumber = previousNumber - currentNumber;
            break;
    }
    console.log('после операции до возврата:', 'pN:', previousNumber, 'op:', operator, 'cN:',currentNumber);
    
    let decimalPlacesAfter = countDecimalPlaces(currentNumber);

    
    if (currentNumber % 1 !== 0 && decimalPlacesAfter > 12) {
        console.log('нужно уменьшить число до n знаков')
        currentNumber = parseFloat(currentNumber.toFixed(decimalPlaces));
    }
    
    else if (currentNumber % 1 === 0 && !currentNumber.toString().includes('e')) {
        console.log('волюнтаристки изменилои число до 1го знака')
        currentNumber = parseInt(currentNumber);
    }
    
    console.log('после операции возврата переменные:', 'pN:', previousNumber, 'op:', operator, 'cN:',currentNumber);
    toShowNumber = currentNumber;
    historyDisplay = previousNumber + ' ' + operator + ' ' + lastNumber + ' =';
    console.log('historyDisplay:', historyDisplay);
    previousNumber = currentNumber;
    currentNumber = lastNumber;
    switcherEquals = true;
    lastNumber = null;
    lastOperator = operator;
    console.log('lastOperator после equals():', lastOperator);
    operator = null;
    console.log('после операции итого равно переменные:', 'pN:', previousNumber, 'op:', operator, 'cN:',currentNumber);
    
    
    showDisplayNumber();
    showHistory();
    autoResize();
    
}



//let's try to make historyDisplay

function showHistory () {
    //console.log('сработала функция historyDisplay')
    displayHistory.innerText = historyDisplay;
}


//let's try adjust font size if input.value > size of display
function autoResize() {
    //console.log('сработала функция autoresize');
  
    let fontSize = parseInt(getComputedStyle(displayNumber).getPropertyValue("font-size"));
    let width = displayNumber.offsetWidth;
    let textWidth = getTextWidth(displayNumber.value, fontSize + "px " + getComputedStyle(displayNumber).getPropertyValue("font-family"));
    8

    while (textWidth+10 > width) {
        fontSize--;
        textWidth = getTextWidth(displayNumber.value, fontSize + "px " + getComputedStyle(displayNumber).getPropertyValue("font-family"));
        console.log('width:', width, 'textWidth:', textWidth);
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

