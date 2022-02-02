let displayValue="";
let num1=0;
let num2=null;
let operator=null;
let results=null;
let lastCalcValue=null;
let previousOp=null;
let previousNum2=null;
let currentNum=null;
let decimalNum1=false;
let decimalNum2=false;

const numberButtons= document.querySelectorAll(".number");
const display= document.querySelector(".display");
const equalsOp= document.getElementById("equals");
const addOp= document.getElementById("plus");
const subtractOp= document.getElementById("minus");
const multiplyOp= document.getElementById("multiply");
const divideOp= document.getElementById("divide");
const clearOp= document.getElementById("clear");
const backSpaceOp= document.getElementById("delete");

backSpaceOp.addEventListener("click",backSpace);
clearOp.addEventListener("click", clear);
equalsOp.addEventListener("click", operate);
addOp.addEventListener("click",function (e){opButtonEvent(this.id)});
subtractOp.addEventListener("click",function(e){opButtonEvent(this.id)});
multiplyOp.addEventListener("click",function(e){opButtonEvent(this.id)});
divideOp.addEventListener("click",function(e){opButtonEvent(this.id)});
numberButtons.forEach(button => {
    button.addEventListener("click",function(e){numButtonEvent(this.id)});   
});

displayNum(num1);

function checkVals(located){
    console.log("Location: ",located);
    console.log("First Number= ",num1);
    console.log("Second Number= ",num2);
    console.log("Current Solution Value= ", lastCalcValue)
    console.log("Current Operator= ",operator);
    console.log("----------------------");
}
function backSpace(){
    checkVals("start of backspace")
    if(whichNum()===null)return;
    let newString;
    let stringLength;
    displayValue=numToString(displayValue);
    stringLength=checkLength(displayValue);
    newString=displayValue.substring(0,(stringLength-1));
    if(checkLength(newString)===0)newString=0;
    if(whichNum()===1)num1=newString;
    else if(whichNum()===2)num2=newString;
    displayNum(newString);
    checkVals("end of backspace");
}
function whichNum(){
    if (currentNum===null)return null;
    else if(currentNum===1)return 1;
    else if(currentNum===2)return 2;
}
function decimalValue(number){
    if(number===1) decimalNum1=true;
    else if(number===2)decimalNum2=true;
}

function isString(num){
    if(typeof num==="string") return true;
    else return false;
}

function isNum(num){
    if(typeof num==="number") return true;
    else return false;
}
function stringToNum(stringNum){
    let numNum= parseFloat(stringNum);
    return numNum;
}

function numToString(numberNum){
    let stringNum =numberNum.toString();
    return stringNum;
}

function checkLength(num){
    if(num===null)return;
    else if(num===undefined)return;

    let numLength =num.toString().length;
    return numLength;
}

function setLastCalcValue(num){
    lastCalcValue=num;
}

function numButtonEvent(numPressed){

    if(operator===null){
            
        if((numPressed===".")&&(decimalNum1===true)) return;
        if(numPressed===".") decimalValue(1);
        if(checkLength(num1)>=19) return;

        if((num1===0)&&(numPressed===".")){
            num1=(num1+numPressed);
            displayNum(num1);
        }
        else if(num1===0){ 
            num1=numPressed;
            displayNum(num1);
        }
        else{
            num1=(num1+numPressed);
            displayNum(num1);
        }   
        currentNum=1;
    }

    else{

        if((numPressed===".")&&(decimalNum2===true)) return;
        if(numPressed===".") decimalValue(2);
        if(checkLength(num2)>=19) return;

        if((num2===null)&&(numPressed===".")){
            num2=("0"+numPressed);
            displayNum(num2);
        }
        else if(!num2){ 
            num2=numPressed;
            displayNum(num2);
        }
        else{
            num2=(num2+numPressed);
            displayNum(num2);
        }
        currentNum=2;
    }
    checkVals("At Number Event Listener Exit")
}

function opButtonEvent(opPressed){
        checkVals("Entering Operator Event Listener");
    

    if(operator===null){
        
        selectedOp(opPressed);
    }
    else{
        if(num2===null)return;//return if there isnt a second number
        operate();
        selectedOp(opPressed); //set the next calculation to use this operator now
    }
        checkVals("Entering Operator Event Listener");
}

function selectedOp(selected){
    operator=selected;
}

function resetNumOp(){
    num1 =0;
    num2 =null;
    operator=null;
    decimalNum1=false;
    decimalNum2=false;
    currentNum=null;
    results=null;
}

function clear(){
    resetNumOp();
    displayNum(num1);
    lastCalcValue=null;
    previousOp=null;
    previousNum2=null;
    }

function displayNum(num){
    displayValue=num;
    stringToNum(displayValue);
    display.textContent=displayValue;
}

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
    if(num1===0||num2===0) return "One does not Simply divide by 0";
    let quotient=(num1/num2);
    return quotient;
}

function preCalcChecks(checkFirst,checkSecond){
    
    
    if(lastCalcValue!==null){ //If there was a previous calculation, set num1 = the result of the previous calculation
        num1=lastCalcValue;

        if(checkSecond===null)num2=num1;
    }
    else if(checkSecond===null) num2=num1;

    if(operator===null){
        if((previousOp===null)&&(num2===null)){
            displayValue=num1
        }
        else{
        operator=previousOp;
        num2= previousNum2;
        }
    }
    num1=Number(num1);
    num2=Number(num2);
}
function processResults(calcResults){
    
    if(calcResults==="One does not Simply divide by 0"){
        displayNum(calcResults);
        calcResults=null;// if calcResults stays a string, the next operation preformed=NaN
        setLastCalcValue(calcResults);
        resetNumOp();
        
    }
    else{
        calcResults= Math.round(results*10000)/10000;
        previousNum2=num2;
        previousOp=operator;
        setLastCalcValue(calcResults);
        displayNum(calcResults);
        resetNumOp();
    }
    checkVals("After Calculation and Reset");

   
}

function operate(){
        checkVals("Before Calc-Before Checks");
    preCalcChecks(num1,num2);
        checkVals("Before Calc-After Checks");
    switch(operator){

        case "plus":
        results =add(num1,num2);
        break;

        case "minus":
        results =subtract(num1,num2);
        break;

        case "multiply":
        results =multiply(num1,num2);
        break;

        case "divide":
        results =divide(num1,num2);
        break;

        case null:
        results= displayValue;
        break;
    }

        checkVals("After Calc-Before");

    processResults(results);
}
    

