let currentNumber = 0;
let previousNumber;
let operator;

const displayNumber = document.querySelector('.display__main');
console.log('main__display:', displayNumber);

const listenToButtons = function (event) {
    if(event.target.closest('button')) {
        let clickedButton = event.target.closest('button');

        if (clickedButton.classList.contains('button__operate')) {
            console.log('сработала кнопка operate!');
        }
        else if(clickedButton.classList.contains('button__int')) {
            console.log('сработала кнопка int!');
        }
        else if(clickedButton.classList.contains('button__toggle')) {
            console.log('сработала кнопка toggle!');
            toggleButton();
        }
        else if(clickedButton.classList.contains('button__point')) {
            console.log('сработала кнопка point!');
        }
    }
}

//buttons

function toggleButton() {
    if(currentNumber !== 0){
        currentNumber = -currentNumber;
        showDisplayNumber();
    }
    console.log('currentNumber', currentNumber);
    showDisplayNumber();
}

const allButtons = document.querySelector('.calc__buttons');

allButtons.addEventListener('click', event => listenToButtons(event));

function showDisplayNumber () {
    displayNumber.textContent = currentNumber;
    console.log(displayNumber);
}

showDisplayNumber();

function operate(number1, operator, number2) {
    
}
