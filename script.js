let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";
let waitingForSecondNumber = false;

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll("[data-digit]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equals");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}

function inputDigit(digit) {
  if (waitingForSecondNumber) {
    displayValue = digit;
    waitingForSecondNumber = false;
  } else if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue = displayValue + digit;
  }

  updateDisplay();
}

function calculate() {
  secondNumber = Number(displayValue);

  const result = operate(operator, firstNumber, secondNumber);

  displayValue = String(result);
  updateDisplay();
}

function chooseOperator(newOperator) {
  if (operator !== null && !waitingForSecondNumber) {
    calculate();
  }

  firstNumber = Number(displayValue);
  operator = newOperator;
  waitingForSecondNumber = true;
}

function pressEquals() {
  calculate();
  operator = null;
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputDigit(button.dataset.digit);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
  });
});

equalsButton.addEventListener("click", pressEquals);
