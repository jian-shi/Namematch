function findA(input, position=0){
    if (position < input.length){  
      return input.substring(position, position+1) == 'a'? 'Position ' + (position+1) :findA(input, position+1); // if find 'a' then return the position, else call itself
    }
    else{ //if current position is the end of the input and no a, return message
        return "Position: N/A";
    }
}
    

function countString(input){
    let charArray = input.split(''); //make string to array
    let totalCharacters = charArray.length;
    let result = {};

    for (let i=0; i<totalCharacters; i++){
      result[charArray[i]]? result[charArray[i]] +=1 : result[charArray[i]]=1; //if current char exist in result then + 1, else create current char and set count to 1
    }

    let output = '<p>=========<br>==Report==</p><ul>';
    for (let item in result) {
      output += '<li>' + item + ': ' + result[item] +'</li>';  //add li to each item in result
    }
    return (output + '</ul><p>Total Characters: ' + totalCharacters + '<p>') //format the output as html
}


function calculate(input){
    input = input.replace(/[^0-9%^*\/()\-+x.]/g, ''); //remove space and other un wanted char
    const operators = [[['x'],['*'],['/'],['%']],[['+'],['-']]]; //array of operators by order

    const divisionbyZero = new RegExp(/\/0/);
    const syntaxError = new RegExp(/\+{2,}/);
    let result;

    if (divisionbyZero.test(input)){
        return result = "Error: Division by zero";
    }
    else if (syntaxError.test(input)){
        return result = "Error: Syntax Error";
    }
    
    else{
        for (let i = 0; i<operators.length; i++){ //loop operators by precedence
            let operator = operators[i];
            let reg = new RegExp('(-?\\d*\\.{0,1}\\d+)([\\' + operator.join('\\')+'])(-?\\d*\\.{0,1}\\d+)'); // set regExp that match current operator, in the format like 99 * 99
            reg.lastIndex = 0;
            while (reg.test(input)) { //if there are still matches between regExp and input
                result = calculate(RegExp.$1, RegExp.$2, RegExp.$3); //calculate using regExp group1, group3 as num and group2 as operator
                input = input.replace(reg, result); //replace the 3 groups with calculated result
            }
        
        }
        result = roundUp(result);
        return result; 
    }
    
    function calculate(a, operator, b){
        a = a * 1;
        b = b * 1;
        switch (operator){
            case '+':
                return a + b;
            case "-":
                return a - b;
            case "/":
                return a / b;
            case 'x':
                return a * b;
            case "*":
                return a * b;
            case "%":
                return a % b;
            default:
                null;
                break;
            }
    }

    function roundUp(num) {
        precision = Math.pow(10)
        return Math.ceil(num) 
    }
      
}

