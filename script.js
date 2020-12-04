//Initialize Display Variables

let displayData = { 'operator': '',
                'num1': '',
                'num2': '', };

const display = document.querySelector('#entry')
const updateDisplayText = function() {
  if (displayData.operator !== '' & displayData.num2 === '') {
    displayText = `${String.fromCharCode(displayData.operator)}`;
  }
  else if (displayData.operator !== '' & displayData.num2 !== '') {
    displayText = `${displayData.num2}`;
  }
  else {
    displayText = `${displayData.num1}`;
  }

  if (displayText.length > 13 & !displayText.includes('.')) {
    return 'TOO BIG';
  }
  else {
    return displayText.slice(0,13);
  }
}

// Create Function Keys

const fnKeys = [{id:'AC', gridName:'clear',},
                {id:String.fromCharCode('247'), gridName:'divide',},
                {id:String.fromCharCode('215'), gridName:'multiply',},
                {id:String.fromCharCode('45'), gridName:'subtract',},
                {id:String.fromCharCode('43'), gridName:'add',},
                {id:'=', gridName:'equals',}];
const fnContainer = document.querySelector('#keys');
createFnKeys(fnKeys,fnContainer);

// Create Number Keys

let numKeys = Array.from({length:11}, (_,i) => 9-i);
const numContainer = document.querySelector('#num-keys');
// Set grid for number keys
numContainer.style['grid-template-rows'] =
    `repeat(${Math.ceil(numKeys.length/3)}, 100px)`;
numContainer.style['grid-template-columns'] =
    `repeat(${Math.ceil(numKeys.length/4)}, 100px)`;
createNumKeys(9, numContainer);


const selectNumKeys = document.querySelectorAll('.num-key');
selectNumKeys.forEach(element => element.addEventListener('click', function(e){
  editNumbers(e);
}));

const selectFnKeys = document.querySelectorAll('.fn-key');
selectFnKeys.forEach(element => element.addEventListener('click', function(e){
  editOperator(e);
}));

function createFnKeys(arr, container) {
  arr.forEach(item => {
    const fnKey = document.createElement('button');
    fnKey.classList.toggle('fn-key');
    fnKey.textContent = item.id;
    fnKey.style.gridArea.name = item.gridName;
    if (item.id === 'AC') {
      fnKey.dataset.key = 08;
    }
    else {
      fnKey.dataset.key = item.id.charCodeAt(0);
    }
    container.appendChild(fnKey);
  });
}

function createNumKeys(num, container) {
  const numKey = document.createElement('button');
  numKey.classList.toggle('num-key');
  if (num === -1) {
    numKey.dataset.key = 190;
    numKey.textContent = '.';
    container.appendChild(numKey);
  }
  else {
    numKey.dataset.key = num.toString().charCodeAt(0);
    numKey.textContent = num;
    container.appendChild(numKey);
    return createNumKeys(num-1,container);
  }
}


function editNumbers(e) {
  if (displayData.operator === '') {
    if (displayData.num1.includes('.') & e.target.textContent === '.') {
      return 'No double decimals';
    }
    displayData.num1 += e.target.textContent;
    display.textContent = updateDisplayText();
  }
  else {
    if (displayData.num2.includes('.') & e.target.textContent === '.') {
      return 'No double decimals';
    }
    displayData.num2 += e.target.textContent;
    display.textContent = updateDisplayText();
  }
}

function editOperator(e) {
  if (e.target.textContent === 'AC') {
    displayData.operator = '';
    displayData.num1 = '';
    displayData.num2 = '';
    display.textContent = '0';
  }
  else if (e.target.textContent === '=' & displayData.num2 === '') {
    displayData.operator = '';
  }
  else if (displayData.num2 === '') {
    displayData.operator = e.target.textContent.charCodeAt(0);
    display.textContent = updateDisplayText();
  }
  else if (displayData.operator === 247 & displayData.num2 == '0') {
    displayData.num2 = '';
    display.textContent = 'NOPE...';
  }
  else {
    displayData.num1 = operate(displayData);
    displayData.operator = e.target.textContent.charCodeAt(0);
    displayData.num2 = '';
    if (e.target.textContent === '=') {
      displayData.operator = '';
    }
    display.textContent = updateDisplayText();
  }
}


// Math Operators
function operate(displayData) {
    operator = displayData.operator;
    num1 = Number(displayData.num1);
    num2 = Number(displayData.num2);
    switch(operator) {
      case 43: {
        return add(num1,num2);
        break;
      }
      case 45: {
        return subtract(num1,num2);
        break;
      }
      case 215: {
        return multiply(num1,num2);
        break;
      }
      case 247: {
        return divide(num1,num2);
        break;
      }
    }
  }


function add(a,b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function multiply(a,b) {
  return a*b;
}

function divide(a,b) {
  return a/b;
}
