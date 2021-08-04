//Variables
let isStartInput = true;
let isDotIncluded = false;
let operator;
let firstOperand = 0;
let currentValue = 0;
let memoryValue = 0;

$(function () {
  //Keyboard
  $(document).on("keydown", function (e) {
    let keyCode = e.keyCode;
    switch (keyCode) {
      //Number Keys
      case 110:
        setInput(".");
        // console.log(`It's Focus!`);
        // $(document).find(`[data-val='.']`).focus();
        break;
      case 96:
        setInput(0);
        break;
      case 97:
        setInput(1);
        break;
      case 98:
        setInput(2);
        break;
      case 99:
        setInput(3);
        break;
      case 100:
        setInput(4);
        break;
      case 101:
        setInput(5);
        break;
      case 102:
        setInput(6);
        break;
      case 103:
        setInput(7);
        break;
      case 104:
        setInput(8);
        break;
      case 105:
        setInput(9);
        break;
      //Function Keys
      case 106:
        action();
        operator = "*";
        display();
        break;
      case 107:
        action();
        operator = "+";
        display();
        break;
      case 109:
        action();
        operator = "-";
        display();
        break;
      case 111:
        action();
        operator = "/";
        display();
        break;
      //All Clear Key
      case 8:
        $("#ac").click();
        break;

      default:
        break;
    }
    console.log(keyCode);
  });

  //Numbers
  $(".calc-number").click(function () {
    let inputNumber = $(this).data("val");
    setInput(inputNumber);
  });

  //Functions
  $(".calc-button").click(function () {
    let inputFunction = $(this).data("val");
    action();
    operator = inputFunction;
    display();
  });

  //Memory
  $(".memory").click(function () {
    let memoryFunction = $(this).data('val');
    if (memoryFunction == '+m') {
      memoryValue += currentValue;
    }
    if (memoryFunction == '-m') {
      memoryValue -= currentValue;
    }
    if (memoryValue == 'mr') {
      currentValue = memoryValue;
      display();
    }
  });

  //Equal
  $("#equal").click(function () {

  });

  //All Clear
  $("#ac").click(function () {
    firstOperand = 0;
    currentValue = 0;
    memoryValue = 0;
    isStartInput = true;
    isDotIncluded = false;
    operator = null;
    setInput(0);
  });

});

function action() {
  isStartInput = true;
  isDotIncluded = false;
  currentValue *= 1;

  if (!operator) {
    firstOperand = currentValue;
    return;
  }
  let result;
  switch (operator) {
    case "+":
      result = firstOperand + currentValue;
      break;
    case "-":
      result = firstOperand - currentValue;
      break;
    case "*":
      result = firstOperand * currentValue;
      break;
    case "/":
      result = firstOperand / currentValue;
      break;
    // case "mr":
    //   result = memoryValue;
    //   break;
  }
  firstOperand = result;
  currentValue = result;
  operator = null;
}

function display() {
  $("#number-screen").val(currentValue);
  $("#function-screen").val(operator);
  if (currentValue == 'Infinity') {
    $("#ac").click();
    $("#function-screen").val('∞');
  }
}

function setInput(input) {
  if (isStartInput == true) {
    isStartInput = false;

    if (input == ".") {
      currentValue = "0";
    }
    else {
      currentValue = "";
    }

    while (input == "0") {
      currentValue = "0";
      input = "";
      isStartInput = true;
    }
  }

  if (isDotIncluded == true) {
    if (input == ".") {
      return
    }
  }

  if (input == ".") {
    isDotIncluded = true;
  }

  currentValue += input;
  display();
}