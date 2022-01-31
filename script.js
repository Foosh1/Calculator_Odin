let results;
let currentValue=null;
let num1=null;
let num2=null;
let operator=null;
let displayValue="";

const numberButtons= document.querySelectorAll(".number");
const display= document.querySelector(".display");
const equalsOp= document.querySelector("#equals");
const addOp= document.querySelector("#plus");
const subtractOp= document.querySelector("#minus");
const multiplyOp= document.querySelector("#multiply");
const divideOp= document.querySelector("#divide");
const clearOp= document.querySelector("#clear")

clearOp.addEventListener("click", clear);
addOp.addEventListener("click",function (e){
    console.log("operator",operator);
    if(operator===null)selectedOp(this.id);
    else{
        operate();
        selectedOp(this.id);
    }});
subtractOp.addEventListener("click",function(e){
    console.log("operator",operator);
    if(operator===null)selectedOp(this.id);
    else{
        operate();
        selectedOp(this.id);
    }});
multiplyOp.addEventListener("click",function(e){
    console.log("operator",operator);
    if(operator===null)selectedOp(this.id);
    else{
        operate();
        selectedOp(this.id);
    }});
divideOp.addEventListener("click",function(e){
    console.log("operator",operator);
    if(operator===null)selectedOp(this.id);
    else{
        operate();
        selectedOp(this.id);
    }});
equalsOp.addEventListener("click", operate);


numberButtons.forEach(button => {
    button.addEventListener("click",function(e){
        
        
        if(currentValue===null)
            if(!num1){ 
            num1=this.id;
            displayNum(num1);}

            else if(!operator){
            num1=(num1+this.id);
            displayNum(num1);
            }

            else if(!num2){ 
            num2=this.id;
            displayNum(num2);
            }

            else{
            num2=(num2+this.id);
            displayNum(num2);
            }
        else{
             if(!num2){ 
            num2=this.id;
            displayNum(num2);
            }
            else{
            num2=(num2+this.id);
            displayNum(num2);
            }
        }
        console.log("num1",num1);
        console.log("num2",num2);
    });
});


/*numInput1 =prompt("first number");
numInput2 =prompt("second number");
operatorInput=prompt("operator");*/

//operate(numInput1,numInput2,operatorInput);


function isCurrentValue(num){
    currentValue=num;
}

function selectedOp(selected){
    operator=selected;
    console.log(selected);
}

function resetNumOp(){
    num1 =null;
    num2 =null;
    operator=null;
}

function clear(){
    resetNumOp();
    displayValue="";
    display.textContent="";
    currentValue=null;
}

function displayNum(num){
    displayValue=num;
    display.textContent=displayValue;
    
}
function stringToNum(stringNum){
    let numNum= parseInt(stringNum);
    return numNum;
}

function add(num1,num2){
    let sum = (num1+num2);
    console.log("sum =",sum);
    return sum;
}

function subtract(num1,num2){
    let differnce =(num1-num2);
    console.log("differnce=",differnce);
    return differnce;
}

function multiply(num1,num2){
    let product = (num1*num2);
    console.log("product =",product);
    return product;
}

function divide(num1,num2){
    if(num1===0||num2===0) return "One does not Simply divide by 0";
    let quotient=(num1/num2);
    console.log("quotient =",quotient);
    return quotient;
}

function operate(){
    
   console.log("currentvalue=",currentValue)

   num1=stringToNum(num1);
   num2=stringToNum(num2);
  

   if(currentValue!==null)num1=currentValue;
   console.log("num1",num1);
   console.log("num2",num2);

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
    }
    
    isCurrentValue(results);
    resetNumOp();
    console.log("calculated value",currentValue);
    displayNum(results);
    if(currentValue==="One does not Simply divide by 0") currentValue=null;
    
}

