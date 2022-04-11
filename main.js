const accumulatorDisplay = document.querySelector(".calculator__accumulator");
const totalDisplay = document.querySelector(".calculator__total");
const calculatorButtons = document.querySelectorAll(".calculator__input__btn");

let accumulatorString = "";
let total = 0;

totalDisplay.textContent = total;

calculatorButtons.forEach((calculatorButton) => {
  calculatorButton.addEventListener("click", (e) => {
    const content = e.target.innerHTML;
    buttonPressed(content);
  });
});

const buttonPressed = (content) => {
  if (
    content !== "=" &&
    content !== "AC" &&
    content !== "Del" &&
    content !== "FS"
  ) {
    if (accumulatorString.length === 0) {
      if (total === 0) {
        if (isNaN(content)) {
          return;
        }
      } else {
        accumulatorString = `${total}`;
      }
    }
    accumulatorString += content;
    totalDisplay.hidden = true;
  }

  const lastChar = accumulatorString[accumulatorString.length - 1];
  const secondLastChar = accumulatorString[accumulatorString.length - 2];
  if (
    isNaN(lastChar) &&
    isNaN(secondLastChar) &&
    secondLastChar !== undefined
  ) {
    accumulatorString = accumulatorString.substr(
      0,
      accumulatorString.length - 1
    );
  }
  updateDisplay(accumulatorString);

  if (content === "AC") {
    accumulatorString = "";
    updateDisplay(accumulatorString);
    updateTotalDisplay(0);
  }

  if (content === "Del") {
    accumulatorString = accumulatorString.substring(
      0,
      accumulatorString.length - 1
    );
    updateDisplay(accumulatorString);
    if (!accumulatorString.length) {
      totalDisplay.hidden = false;
      updateTotalDisplay(0);
    }
  }

  if (content === "=") {
    if (isNaN(lastChar)) {
      return;
    }
    totalDisplay.hidden = false;
    updateTotalDisplay(accumulatorString);
    accumulatorString = "";
    updateDisplay(accumulatorString);
  }
};

const updateDisplay = (accumulatorString) => {
  accumulatorDisplay.textContent = accumulatorString?.substr(0, 18);
};

const updateTotalDisplay = (accumulatorString) => {
  total = eval(accumulatorString);
  const isFloating = total % 1 !== 0;
  if (isFloating) {
    totalDisplay.textContent = total?.toFixed(3);
  } else {
    totalDisplay.textContent = Number(String(total)?.substring(0, 10));
  }
};
