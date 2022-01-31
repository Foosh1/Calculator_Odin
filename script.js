let results;
let num1;
let num2;
let operator;
let displayValue;
const numberButtons =document.querySelectorAll(`#${/^1-9/g}`)

const addOp = "+";
const subtractOp = "-";
const multiplyOp = "*"
const divideOp = "/";

numberButtons.forEach(button => {
    button.addEventListener(click,function(e){

    
    
});

/*numInput1 =prompt("first number");
numInput2 =prompt("second number");
operatorInput=prompt("operator");*/

//operate(numInput1,numInput2,operatorInput);
function displayNum()

function add(num1,num2){
    let sum = (num1+num2);
    return sum;
}

function subtract(num1,num2){
    let differnce =(num1-num2);
    return differnce;
}

function multiply(num1,num2){
    let product = (num1*num2);
    return product;
}

function divide(num1,num2){
    let quotient=(num1/num2);
    return quotient;
}

function operate(firstNum,SecondNum,operator){

   let num1 = parseInt(firstNum);
   let num2 = parseInt(SecondNum);

    switch(operator){

        case addOp:
        results =add(num1,num2);
        break;

        case subtractOp:
        results =subtract(num1,num2);
        break;

        case multiplyOp:
        results =multiply(num1,num2);
        break;

        case divideOp:
        
        results =divide(num1,num2);
        break;
    }

    console.log(results)

    return results;
    
}

