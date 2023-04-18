let currentNumber = 0;
let previousNumber = null;
let operator = null;
let lastOperator = null;

// console.log('type of null:', typeof null);
// console.log('true of 0 == null:', 0 == null);


const displayNumber = document.querySelector('.display__main');
const allButtons = document.querySelector('.calc__buttons');

//console.log('main__display:', displayNumber);

//to choice the function depending button's class click
const listenToButtons = function (event) {
    if(event.target.closest('button')) {
        let clickedClass = event.target.closest('button').classList.value;
        let clickedId = event.target.closest('button').id;
        //console.log('clickedButton.id:', clickedId);

        if (clickedClass == 'button__operate') {
            console.log('сработала кнопка operate!:', event.target.closest('button').innerText);
            operateButton(event.target.closest('button').innerText);
        }
        else if(clickedClass == 'button__clear') {
            console.log('сработала кнопка clear!');
            clearButton();
        }
        else if(clickedClass == 'button__int') {
            console.log('сработала кнопка int!');
            numberButton(parseInt(clickedId));
        }
        else if(clickedClass == 'button__toggle') {
            console.log('сработала кнопка toggle!');
            toggleButton();
        }
        else if(clickedClass == 'button__point') {
            console.log('сработала кнопка point!');
        }
        else if (clickedClass == 'button__equals') {
            console.log('сработала кнопка equals!');
            operate();
        }
        else if (clickedClass == 'button__backspace') {
            console.log('сработала кнопка backspace!');
            backspaceButton();
        }
    }
}

//buttons
function numberButton(button) {
    if (currentNumber === 0) {
        currentNumber = button;
        console.log('работает number1');
    }
    
    else if (operator !== null && currentNumber === 0) {
        previousNumber = currentNumber;
        currentNumber = button;
        operator = null;
        console.log('работает number2');
    }
    
    else if (currentNumber !== null && operator !== null && previousNumber !== null) {
        if (currentNumber !== 0) {
            currentNumber = parseInt(`${currentNumber}${button}`);
            console.log('работает number3 с исключением');
        }
        else {
        previousNumber = currentNumber;
        currentNumber = button;
        console.log('работает number3');
        }
    }

    else if (currentNumber !== null && operator == null && previousNumber !== null) {
        previousNumber = currentNumber;
        currentNumber = button;
        operator = lastOperator;
        console.log('работает number4');
    }

    else if (currentNumber !== 0) {
        currentNumber = parseInt(`${currentNumber}${button}`);
        console.log('работает number5');
    }

    
    showDisplayNumber();
}

function operateButton(button) {
    if (operator == null) {
        operator = button;
        previousNumber = currentNumber;
        currentNumber = 0;
        console.log('operator присвоен:', operator)
    }
    else if (currentNumber && operator && previousNumber) {
        operator = button;
        console.log('operator:', operator, typeof operator);
        console.log('сработала условие: заполнены все значения', previousNumber, operator,currentNumber);
        operate();
        //console.log(currentNumber); 
    }
    //else if (){}
}

function clearButton(button) {
    operator = null;
    previousNumber = null;
    currentNumber = 0;
    
    showDisplayNumber();
}

function toggleButton() {
    if(currentNumber !== 0){
        currentNumber = -currentNumber;
        showDisplayNumber();
    }
    console.log('currentNumber', currentNumber);
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
    displayNumber.textContent = currentNumber;
    //console.log(displayNumber);
}

showDisplayNumber();

let lastNumber;

function operate() {
    console.log('запускаем уравнение');
    console.log('значения переменных:', 'pN', previousNumber, 'op', operator, 'cN',currentNumber);
    
    if (!currentNumber && !previousNumber && !operator) {
        return;
    }
    else if (!currentNumber) {
        currentNumber = parseInt(displayNumber.innerText);
        console.log('присвоили currentNumner значение Экрана:', currentNumber);
    }
    else if(!operator) {
        operator = lastOperator;
        console.log('operator был пустой, взяли значение:', lastOperator);
    }
    else if (!lastNumber) {lastNumber = currentNumber};

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
            currentNumber = previousNumber + currentNumber;
            break;
        case '-':
            console.log('subtract');
            currentNumber = previousNumber - currentNumber;
            break;
    }
    showDisplayNumber();
    previousNumber = lastNumber;
    lastOperator = operator;
    operator = null;
    console.log('после операции равно переменные:', 'pN', previousNumber, 'op', operator, 'cN',currentNumber);
    
}
