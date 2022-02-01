let results;
let currentValue=null;
let num1=0;
let num2=null;
let operator=null;
let previousOp=null;
let previousNum2;
let displayValue="";
let decimalNum1=false;
let decimalNum2=false;
let currentNum=null;

const numberButtons= document.querySelectorAll(".number");
const display= document.querySelector(".display");
const equalsOp= document.querySelector("#equals");
const addOp= document.querySelector("#plus");
const subtractOp= document.querySelector("#minus");
const multiplyOp= document.querySelector("#multiply");
const divideOp= document.querySelector("#divide");
const clearOp= document.querySelector("#clear");
const backSpaceOp= document.querySelector("#delete");

backSpaceOp.addEventListener("click",backSpace);
clearOp.addEventListener("click", clear);
equalsOp.addEventListener("click", operate);
addOp.addEventListener("click",function (e){
    checkVals("Entering Operator Event Listener");
    
    if(operator===null){
        
        selectedOp(this.id);
    }
    else{
        operate();
        selectedOp(this.id);
    } 
    checkVals("Exiting Operator Event Listener");
});
subtractOp.addEventListener("click",function(e){
    checkVals("Entering Operator Event Listener");
   
    if(operator===null){
        selectedOp(this.id);
    }
    else{
        operate();
        selectedOp(this.id);
    }
    checkVals("Exiting Operator Event Listener");
});
multiplyOp.addEventListener("click",function(e){
    checkVals("Entering Operator Event Listener");
    
    if(operator===null){
        selectedOp(this.id);
    }
    else{
        operate();
        selectedOp(this.id);
    }
    checkVals("Exiting Operator Event Listener");
});
divideOp.addEventListener("click",function(e){
    checkVals("Entering Operator Event Listener");
    
    if(operator===null){
        selectedOp(this.id);
    }   
    else{
        operate();
        selectedOp(this.id);
    }
    checkVals("Exiting Operator Event Listener");
});
numberButtons.forEach(button => {
    button.addEventListener("click",function(e){
        
        if(operator===null){
            
            if((this.id===".")&&(decimalNum1===true)) return;
            if(this.id===".") decimalValue(1);
            if(checkLength(num1)>=19) return;

            if((num1===0)&&(this.id===".")){
                num1=(num1+this.id);
                displayNum(num1);
            }
            else if(num1===0){ 
                num1=this.id;
                displayNum(num1);
            }
            else{
                num1=(num1+this.id);
                displayNum(num1);
            }   
            currentNum=1;
        }

        else{

            if((this.id===".")&&(decimalNum2===true)) return;
            if(this.id===".") decimalValue(2);
            if(checkLength(num2)>=19) return;

            if((num2===null)&&(this.id===".")){
                num2=("0"+this.id);
                displayNum(num2);
            }
            else if(!num2){ 
                num2=this.id;
                displayNum(num2);
            }
            else{
                num2=(num2+this.id);
                displayNum(num2);
            }
            currentNum=2;
        }
        checkVals("At Number Event Listener Exit");
    });
});

displayNum(num1);

function checkVals(located){
    console.log("Location: ",located);
    console.log("First Number= ",num1);
    console.log("Second Number= ",num2);
    console.log("Current Solution Value= ", currentValue)
    console.log("Current Operator= ",operator);

    //console.log("Length of num1=",checkLength(num1));
    //console.log("Length of num2=",checkLength(num2));
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

function needsTrim(num){
    numCheck=num;

    if(isNum(numCheck)===true)numCheck=numToString(numCheck);

    if(checkLength(numCheck)>19){
        numCheck= trimIt(numCheck);
        return numCheck;
    }
    else return num;
}

function trimIt(num){
    let numToTrim=num;
    
    if(isNum(numToTrim)===true) numToTrim=numToString(numToTrim);

    numToTrim= trimNum(numToTrim);
    return stringToNum(numToTrim);

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

function trimNum(num){
    let trimmedNum= num.slice(0,19);
    return trimmedNum;
}

function checkLength(num){
    if(num===null)return;
    else if(num===undefined)return;

    let numLength =num.toString().length;
    return numLength;
}

function setCurrentValue(num){
    currentValue=num;
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
}

function clear(){
    resetNumOp();
    displayNum(num1);
    currentValue=null;
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

function operate(){

    checkVals("Before Calc/Unchanged");
    

    if(currentValue!==null){
        num1=currentValue;

        if(num2===null)num2=num1;
    }
    else if(num2===null) num2=num1;

    if(operator===null){
        if((previousOp===null)&&(num2===null)){
            displayValue=num1
        }
        else{
        operator=previousOp;
        num2= previousNum2;
        }
    }
    checkVals("Before Calc/before String ");
    num1=stringToNum(num1);
    num2=stringToNum(num2);
    
    checkVals("Before Calc/Changed");

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
        checkVals("After Calculation");

        

    if(results==="One does not Simply divide by 0"){
        displayNum(results);
        results=null;
        setCurrentValue(results);
        resetNumOp();
        checkVals("After Calculation and Reset");
    } 
    else{
        results= Math.round(results*10000)/10000;
        previousNum2=num2;
        previousOp=operator;
        console.log("Length of Results=",checkLength(results));
        //results=needsTrim(results);
        //console.log("Length of Results after Trim=",checkLength(results));
        setCurrentValue(results);
        checkVals("After Calculation");
        resetNumOp();
        displayNum(results);
        checkVals("After Calculation and Reset");
    }
}
    

