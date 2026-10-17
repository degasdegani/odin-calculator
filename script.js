let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll("[data-digit]");

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
  if (displayValue === "0") {
    displayValue = digit;
  } else {
    displayValue = displayValue + digit;
  }

  firstNumber = Number(displayValue);
  updateDisplay();
}

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputDigit(button.dataset.digit);
  });
});
