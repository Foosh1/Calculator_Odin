/* The comments in this code were meant for people who have never coded before*/

let displayValue="";//this is a variable that tarcks what we are currently displaying on the calculators screen
let num1=0;// this variable tracks what is the first number in our math problem
let num2=null;// this variable tracks what is the second number in our math problem
let currentNum=null;//This variable keeps track of what number we are currently entering into the calculator
let operator=null;//This variable tracks what operator we are going to use in our math problem. Current available operators are: "+ - x ÷"
let results=null;//this variable tracks the value of the results of the calculation preformed and gets reset after each calculation
let currentSolution=null;// This variable keeps track of the results from the previous calculation
let previousOp=null;//This variable keeps track of the operator used in the previous calculation
let previousNum2=null;//This variable keeps track of the second number used in previous calculation
let decimalNum1=false;//This variable keeps track of if there is a decimal in the first number, when a decimal is added the value is changed to true
let decimalNum2=false;//This variable keeps track of if there is a decimal in the second number, when a decimal is added the value is changed to true

//the code below selects elements from our html file and assigns them a variable name so that we can add functionality to these elements with javascript
const numberButtons= document.querySelectorAll(".number");//this selects ALL OF the number buttons since it uses ("querySelectorAll")
const display= document.querySelector(".display");// this selects the display 
const equalsOp= document.getElementById("equals");// this selects the equals button
const addOp= document.getElementById("plus");// this selects the plus button 
const subtractOp= document.getElementById("minus");// this selects minus button
const multiplyOp= document.getElementById("multiply");// this selects the multiply button
const divideOp= document.getElementById("divide");// this selects the divide button 
const clearOp= document.getElementById("clear");// this selects the clear button 
const backSpaceOp= document.getElementById("delete");// this selects the delete button 

//the code below adds "event listeners" to all of our buttons so that when an event occurs(when the buttons are clicked), certain code is excuted. Example on next line
backSpaceOp.addEventListener("click",backSpace); // when back space button is clicked, the code inside the function "backSpace" is excuted
clearOp.addEventListener("click", clear);
equalsOp.addEventListener("click", operate);
/* the 4 operators("+ - x ÷") call the same function("opButtonEvent") which assigns a value to the variable operator.
 we let that function know which operator is being pressed by giving it the id of the button pressed with ("this.id")*/
addOp.addEventListener("click",function (e){opButtonEvent(this.id)});
subtractOp.addEventListener("click",function(e){opButtonEvent(this.id)});
multiplyOp.addEventListener("click",function(e){opButtonEvent(this.id)});
divideOp.addEventListener("click",function(e){opButtonEvent(this.id)});
/*Finally we add an event listener for each number and the decimal using a loop doesnt stop looping until each number button has an event listener*/
numberButtons.forEach(button => {//(".forEach") means that the code below will excute
    button.addEventListener("click",function(e){numButtonEvent(this.id)});   
});

displayNum(num1);// this displays the value of num1(which by default is 0) when the webpage is first loaded

function checkVals(located){// this function checks these values when it is called. This helps with figuring out which part of the code is responsible if we get a value that we dont want
    console.log("Location= ",located);
    console.log("First Number= ",num1);
    console.log("Second Number= ",num2);
    console.log("Current Solution Value= ", currentSolution)
    console.log("Current Operator= ",operator);
    console.log("----------------------");
}
function backSpace(){//this function deletes the last number entered when the delete button is clicked

    checkVals("start of backspace")

    if(whichNum()===null||displayValue==="One does not Simply divide by 0")return;//if nothing has been entered yet or the divide by zero error message is being displayed disable the delete button by exiting the  function
    displayValue= String(displayValue);// we want to make sure the the value of what is being displayed is a string because we need it to be for the next 2 lines to work
    let numLength=checkLength(displayValue);//this will be equal to the length of the current number
    let newNum=displayValue.substring(0,(numLength-1));//this will be the new number being displayed after deleting the last number

    if(whichNum()===1){//this checks to see which number we are currently working with. This code excutes if we are working with number 1
        if(checkLength(newNum)===0)num1=0;// if all numbers are deleted, then nothing would display, we want 0 to display in this case so we set number 1 equal to 0 if the length of the new number is 0
        else num1=newNum;// sets number 1 equal to the new number if the length of the new number is not 0

        displayNum(num1);// displays the new number
    }
    else if(whichNum()===2){//this checks to see which number we are currently working with. This code excutes if we are working with number 2
        if(checkLength(newNum)===0)num2=0;// // if all numbers are deleted, then nothing would display, we want 0 to display in this case so we set number 2 equal to 0 if the length of the new number is 0
        else num2=newNum;//set number 2 equal to the new number if the length of the new number is not 0
            
        displayNum(num2);//display the new number
    }
    
    checkVals("end of backspace");
}
function whichNum(){// this function check to see which number we are currently displaying in the calculator
    if (currentNum===null)return null;// if nothing has been entered yet we return no value
    else if(currentNum===1)return 1;//if we are currently displaying number 1 we return a value of 1
    else if(currentNum===2)return 2;//if we are currently displaying number 2 we return a value of 
}

function decimalValue(number){// This function tracks if there is a decimal in number 1 or number 2, it is called after the user inputs a decimal. Once the values below are set to true the decimal button is turned off
    if(number===1) decimalNum1=true;//tracks if there is a decimal in number 1
    else if(number===2)decimalNum2=true;//tracks if there is a decimal in number 2
}

function checkLength(num){//this function checks the length of the number given to it, this allows me to shut off the numbers buttons when the length of the number is getting so long that it might overflow out of the display
    if(num===null)return;//cant check length on these values and they can cause problems so exit the function if number is equal to it
    else if(num===undefined)return;//cant check length on these values and they can cause problems so exit the function if number is equal to it

    let numLength =num.length;// makes sure the number being checked is a string and then gets the length of it.
    return numLength;// returns the length of the number
}

function numButtonEvent(numPressed){// This is the code that excutes when a number or decimal is clicked on the calculator

    if(operator===null){// if no operator has been pressed yet any inputs will be considered to be the first number in our calculation
            
        if((numPressed===".")&&(decimalNum1===true)) return; //exits function if decimal is pressed but there is already one in the number
        if(numPressed===".") decimalValue(1); // if decimal is pressed call a function which assigns a value of true to the variable decimalNum1, this variable is checked for in the previous line
        if(checkLength(num1)>=19) return;// exits the function if the length of the current number is greater than 19

        if((num1===0)&&(numPressed===".")){ //if the number on screen is currently 0 and a decimal is pressed
            num1=(num1+numPressed);//adds the decimal behind the zero
            displayNum(num1);//displays "0."
        }
        else if(num1===0){ //the default value for the first number in our calculation is 0. This code excutes if the first number is still the default value
            num1=numPressed;// the first number is equal to the number pressed. This removes the zero and is why the special case above is checked for.
            displayNum(num1);// displays the number that was clicked clicked
        }
        else{
            num1=(num1+numPressed);//the first number is equal to what it currently is + the number pressed eg. 1+4 =14
            displayNum(num1); //displays the new number
        }   
        currentNum=1;//sets current number equal to first number
    }

    else{

        if((numPressed===".")&&(decimalNum2===true)) return; //this code excutes if an operator has been pressed. The code below assigns the value for the second number in  almost an identical way to the first
        if(numPressed===".") decimalValue(2);
        if(checkLength(num2)>=19) return;

        if((num2===null)&&(numPressed===".")){//default value for the second number is =null which means "no value" so we check to see if it is still at default value and we check to see if a decimal was pressed
            num2=("0"+numPressed);// since the default valuee for the second number isnt 0 we have to set the second number = 0 + decimal
            displayNum(num2);
        }
        else if(!num2){ // if there is no value for the second number excute code below
            num2=numPressed;
            displayNum(num2);
        }
        else{
            num2=(num2+numPressed);
            displayNum(num2);
        }
        currentNum=2;//sets current number equal to second number
    }
    checkVals("At Number Event Listener Exit")
}

function opButtonEvent(opPressed){// this function decides what happens when an operator("+ - x ÷") is clicked on the calculator
        checkVals("Entering Operator Event Listener");
    if(operator===null){// if there is no operator assigned currently
        selectedOp(opPressed); //assign the value of operator equal to the operator that was pressed "+ - x ÷"
    }
    else{
        if(num2===null)return;//if there isnt a second number exit the function
        operate();//if there is a second number, and an operator is alreayd assinged that means we need to preform a calculation before assigning a new value to operate
        selectedOp(opPressed); //set the next calculation to use this operator now
    }
        checkVals("Entering Operator Event Listener");
}

function selectedOp(selected){// this function sets the value of operator equal to the operator button clicked
    operator=selected;
}

function resetNumOp(){ // this function resets the value of some variables, it is called after each calculation
    num1 =0;
    num2 =null;
    operator=null;
    decimalNum1=false;
    decimalNum2=false;
    results=null;
    currentNum=null;
}

function clear(){// this function is called when the "Clear" button is clicked it resets all values to their default value
    resetNumOp();//this is the function above
    displayNum(num1);//displays 0 
    currentSolution=null;
    previousOp=null;
    previousNum2=null;
    }

function displayNum(num){// this function sets the value of displayValue equal to the number given to it, then displays it
    displayValue=num;
    display.textContent=displayValue;
}

function add(num1,num2){ // This function adds the two numbers given to it
    let sum = (num1+num2);
    return sum;
}

function subtract(num1,num2){ // This function subtracts the second number from the first number
    let differnce =(num1-num2);
    return differnce;
}

function multiply(num1,num2){// this function multiples the two numbers given to it
    let product = (num1*num2);
    return product;
}

function divide(num1,num2){// this function divides the first number by the second number
    if(num2===0) return "One does not Simply divide by 0";//if second number is equal to 0 display error message that you cant divide by 0 and exit function
    let quotient=(num1/num2);
    return quotient;
}

function preCalcChecks(checkFirst,checkSecond){// this function checks for specific cases that would give wrong or undesirable answers and then sets the first and second number = what we need them to be to get the answer we want
    
    if(currentSolution!==null){//If there was a previous calculation excute this code

        if(checkFirst===0){//Number 1 will be = 0 if the user clicks an operator before entering a number since that is its default value and clicking an operator will set the next input =number 2
            num1=currentSolution;//set num1 = the result of the previous calculation
            if(checkSecond===null&&operator!==null)num2=currentSolution;// if the user hits an operator then the equal button we also want num2 to = currentSolution
            else if(checkSecond===null)num2=previousNum2;//if the user didnt input a second number or and operator we set the second number to the previous second number
        }
        else if(checkSecond===null)num2=previousNum2;// this code excutes if the user did input a number for number 1, but not number 2
    }
    else if(checkSecond===null) num2=num1// If no calulation has been preformed and there is no value for number 2 give it the same value as number 1

    if(operator===null){// if there is currently no operator assinged that means the user clicked the "=" button before selecting a number either before or after a calculation
        operator=previousOp;// in this case we use the operator used in the previous calculation. if no calculations have been made it sets the operator=null which will preform no calculation and set results= to the number being displayed
    }
    num1=Number(num1);//sets data type to be a number, since it might have been a string before
    num2=Number(num2);//sets data type to be a number,since it might have been a string before
}
function processResults(calcResults){//this function processes the results from the calculation preformed
    
    if(calcResults==="One does not Simply divide by 0"){//If the user tried to divide by zero excute this code
        clear()//reset calculator
        displayNum("One does not Simply divide by 0");//display divide by zero attempt LoTR themed error message
    }
    else{
        calcResults= Math.round(results*10000)/10000;//round the calculation to 4 decimal points
        previousNum2=num2;//set the value of previous number 2 equal to number 2
        previousOp=operator;//set the value of previous operator equal to the operator that was used the calulation
        currentSolution=calcResults;//set the value of current currentSolution equal to the results of the calculation preformed
        displayNum(calcResults);//display the results of the calculation
        resetNumOp();//reset some variables so another operation can be done
    }
    checkVals("After Calculation and Reset");
}

function operate(){// this function preforms the calculation
        checkVals("Before Calc-Before Checks");
    preCalcChecks(num1,num2);//check for special cases that would result in wrong or unwanted answers.
        checkVals("Before Calc-After Checks");
    switch(operator){

        case "plus"://if the current operator is + then add number 1 and 2
        results =add(num1,num2);
        break;

        case "minus"://if the current operator is - then subtract number 2 from from number 1
        results =subtract(num1,num2);
        break;

        case "multiply"://if the current operator is x then multiply number 1 and number 2
        results =multiply(num1,num2);
        break;

        case "divide"://if the current operator is ÷ then divide number 1 by number 2
        results =divide(num1,num2);
        break;

        case null://if the current operator is null then someone clicked "="after inputting a number so all we do is keep displaying that number
        results= displayValue;
        break;
    }
        checkVals("After Calc-Before");
    processResults(results);//send the results of the calculation to another function be processed and displayed
}
    

