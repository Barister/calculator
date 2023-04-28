// to determine variables

let currentNumber = 0;
let previousNumber = null;
let operator = null;
let lastOperator = null;
let historyDisplay = '';
let switcherOperate = false;
let switcherEquals = false;
let toShowNumber = null;
let lastNumber = null;

// console.log('type of null:', typeof null);
// console.log('true of 0 == null:', 0 == null);


const displayNumber = document.querySelector('.display__main');
const displayHistory = document.querySelector('.display__history');
const allButtons = document.querySelector('.calc__buttons');

//console.log('main__display:', displayNumber);

//to choice the function depending button's class click
const listenToButtons = function (event) {
    if(event.target.closest('button')) {
        let clickedClass = event.target.closest('button').classList.value;
        let clickedId = event.target.closest('button').id;
        //console.log('clickedButton.id:', clickedId);

        switch (clickedClass) {
            case 'button__operate':
                // console.log('сработала кнопка operate!:', event.target.closest('button').innerText);
                operateButton(event.target.closest('button').innerText);
                break;
            case 'button__clear':
                // console.log('сработала кнопка clear!');
                clearButton();
                break;
            case 'button__int':
                // console.log('сработала кнопка int!');
                numberButton(parseInt(clickedId));
                break;
            case 'button__toggle':
                // console.log('сработала кнопка toggle!');
                toggleButton();
                break;
            case 'button__point':
                // console.log('сработала кнопка point!');
                break;
            case 'button__equals':
                // console.log('сработала кнопка equals!');
                equals();
                break;
            case 'button__backspace': 
                // console.log('сработала кнопка backspace!');
                backspaceButton();
                break;
        }
        
    }
}

//if pressed numbers
function numberButton(button) {
//  
    if (switcherOperate === false && switcherEquals === true) {
        console.log('бинго для кнопки цифры');
        switcherEquals = false;
        currentNumber = button;
        //operator = lastOperator;
        historyDisplay = previousNumber+operator;
        showHistory();
    }

    else if (switcherOperate === true) {
        currentNumber = button;
        switcherOperate = false;
        console.log("Сработало присвоение cN после switchOperate === true!");
    }

    else if (switcherEquals === true) {
        currentNumber = button;
        switcherEquals = false;
        historyDisplay = '';
        console.log("Сработало присвоение cN после switchEquals === true!");
        showHistory();
    }

    else {
        currentNumber = parseInt(`${currentNumber}${button}`);
        console.log("Сработала конкатенация числа!");
    }

    showDisplayNumber();
    
}


// нажатие кнопки с классом operate запускает функцию
function operateButton(button) {

    //if operator == null , 
    if (switcherEquals === true) {
        console.log('switcherEquals === true');
        operator = button;
        currentNumber = previousNumber;
        historyDisplay = previousNumber + operator;
        showHistory();
        switcherEquals = false;
        switcherOperate = true;
    }

    else if (currentNumber && operator && previousNumber) {
        //operator = button;
        console.log('operator:', operator, typeof operator);
        console.log('сработала условие: заполнены все значения', previousNumber, operator, currentNumber);
        
        equals();
        operator = button;
        //console.log(currentNumber); 
    }

    else if (switcherOperate === false) {
        console.log('switcherOperate === false');
        operator = button;
        previousNumber = currentNumber;
        currentNumber = 0;
        historyDisplay = previousNumber + operator;
        switcherOperate = true;
        console.log('historyDisplay:', historyDisplay, operator);
        showHistory();
        console.log('operator присвоен:', operator)
    }

    else {
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
    showHistory();
    showDisplayNumber();
}

function toggleButton() {
    if(currentNumber !== 0){

        currentNumber = -displayNumber.value;
        historyDisplay = historyDisplay + currentNumber;
        showHistory();
        
    }
    console.log('сработала toggleButton, currentNumber =', currentNumber);
    showDisplayNumber();
}

function backspaceButton() {
    if (currentNumber !== 0) {
        console.log('backspace currentNumber !== 0')
        currentNumber = currentNumber.toString().split('').slice(0, -1).join('');
        if (currentNumber == '') {
            currentNumber = 0}
        console.log('currentNumber:', currentNumber);
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
    
    //console.log(displayNumber);
}

showDisplayNumber();



function equals() {
    console.log('запускаем уравнение');
    console.log('значения переменных:', 'pN', previousNumber, 'op', operator, 'cN',currentNumber);
    
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
    toShowNumber = currentNumber;
    historyDisplay = previousNumber + operator + lastNumber + '=';
    console.log('historyDisplay:', historyDisplay);
    previousNumber = currentNumber;
    currentNumber = lastNumber;
    switcherEquals = true;
    lastNumber = null;
    lastOperator = operator;
    console.log('lastOperator после equals():', lastOperator);
    operator = null;
    console.log('после операции равно переменные:', 'pN:', previousNumber, 'op:', operator, 'cN:',currentNumber);
    showDisplayNumber();
    showHistory();
    
    
}



//let's try to make historyDisplay

function showHistory () {
    console.log('сработала функция historyDisplay')
    displayHistory.innerText = historyDisplay;
}