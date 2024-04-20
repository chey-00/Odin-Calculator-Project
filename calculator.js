let operator = "";
let previousValue = "";
let currentValue = "";
let keyContent = "";

document.addEventListener("DOMContentLoaded", () => {
  let clear = document.querySelector(".clear_sign_button .clear_img");
  let equal = document.querySelector(".equal_sign_button .equal_img");
  let decimal = document.querySelector(".dot_sign_button .period_img");

  let numbers = document.querySelectorAll(".number-btn .number-img");
  let operators = document.querySelectorAll(".key--operator .img--operator");

  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");

  numbers.forEach((number) =>
    number.addEventListener("click", function () {
      if (number.classList.contains("number_seven_img")) {
        keyContent = 7;
      } else if (number.classList.contains("number_eight_img")) {
        keyContent = 8;
      } else if (number.classList.contains("number_nine_img")) {
        keyContent = 9;
      } else if (number.classList.contains("number_four_img")) {
        keyContent = 4;
      } else if (number.classList.contains("number_five_img")) {
        keyContent = 5;
      } else if (number.classList.contains("number_six_img")) {
        keyContent = 6;
      } else if (number.classList.contains("number_one_img")) {
        keyContent = 1;
      } else if (number.classList.contains("number_two_img")) {
        keyContent = 2;
      } else if (number.classList.contains("number_three_img")) {
        keyContent = 3;
      } else if (number.classList.contains("number_zero_img")) {
        keyContent = 0;
      } else if (number.classList.contains("period_img")) {
        keyContent = ".";
      }

      handleNumber(keyContent);
      currentScreen.textContent = currentValue;
    })
  );

  operators.forEach((op) =>
    op.addEventListener("click", function () {
      if (op.classList.contains("division_img")) {
        op.textContent = "/";
        operator = op.textContent;
      } else if (op.classList.contains("multiplication_img")) {
        op.textContent = "x";
        operator = op.textContent;
      } else if (op.classList.contains("addition_img")) {
        op.textContent = "+";
        operator = op.textContent;
      } else if (op.classList.contains("minus_img")) {
        op.textContent = "-";
        operator = op.textContent;
      }
      handleOperator(operator);
      previousScreen.textContent = previousValue + " " + operator;
      currentScreen.textContent = currentValue;
    })
  );

  clear.addEventListener("click", function () {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

  equal.addEventListener("click", function () {
    if (currentValue != "" && previousValue != "") {
      calculate();
      previousScreen.textContent = "";
      if (previousValue.length <= 5) {
        currentScreen.textContent = previousValue;
      } else {
        currentScreen.textContent = previousValue.slice(0, 5) + "...";
      }
    }
  });

  decimal.addEventListener("click", function () {
    addDecimal();
  });
});

function handleNumber(keyContent) {
  if (currentValue.length <= 5) {
    currentValue += keyContent;
  }
}

function handleOperator(op) {
  previousValue = currentValue;
  currentValue = "";
}

function calculate() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if (operator === "+") {
    previousValue += currentValue;
  } else if (operator === "-") {
    previousValue -= currentValue;
  } else if (operator === "x") {
    previousValue *= currentValue;
  } else {
    previousValue /= currentValue;
  }

  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
}

function roundNumber(num) {
  return Math.round(num * 1000) / 1000;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
}
