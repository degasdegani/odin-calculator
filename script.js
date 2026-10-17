let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";
let waitingForSecondNumber = false;
let resultShown = false;
let errorShown = false;

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll("[data-digit]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");

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
  display.classList.toggle("error", errorShown);
}

function clearAll() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "0";
  waitingForSecondNumber = false;
  resultShown = false;
  errorShown = false;
  updateDisplay();
}

function showDivisionError() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  displayValue = "Nice try, genius.";
  waitingForSecondNumber = false;
  resultShown = false;
  errorShown = true;
  updateDisplay();
}

function roundResult(result) {
  return Number(result.toFixed(8));
}

function inputDigit(digit) {
  if (errorShown) {
    clearAll();
  }

  if (waitingForSecondNumber) {
    displayValue = digit;
    waitingForSecondNumber = false;
  } else if (resultShown) {
    displayValue = digit;
    resultShown = false;
  } else if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue = displayValue + digit;
  }

  updateDisplay();
}

function calculate() {
  secondNumber = Number(displayValue);

  if (operator === "/" && secondNumber === 0) {
    showDivisionError();
    return;
  }

  const result = operate(operator, firstNumber, secondNumber);

  displayValue = String(roundResult(result));
  updateDisplay();
}

function chooseOperator(newOperator) {
  if (errorShown) {
    return;
  }

  if (operator !== null && !waitingForSecondNumber) {
    calculate();

    if (errorShown) {
      return;
    }
  }

  firstNumber = Number(displayValue);
  operator = newOperator;
  waitingForSecondNumber = true;
  resultShown = false;
}

function pressEquals() {
  if (errorShown || operator === null || waitingForSecondNumber) {
    return;
  }

  calculate();

  if (errorShown) {
    return;
  }

  operator = null;
  resultShown = true;
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
clearButton.addEventListener("click", clearAll);
