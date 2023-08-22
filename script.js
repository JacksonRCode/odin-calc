function add(a,b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    if (b===0) {
        return 0;
    }

    return a / b;
}

function operate(first, item, second) {
    return item(parseInt(first), parseInt(second));
}

function clickReceiver(value) {
    if (!isNaN(value)) {
        addValue(value);
    }
    else if (value==='.' && !usedDot) {
        addValue(value);
        usedDot=true;
    }
    else if (value==='DEL') {
        del();
    }
    else if (value==='AC') {
        first=undefined;
        second=undefined;
        item=undefined;
        onFirst=true;
        usedDot=false;
        choseItem=false;
    }
    else if (!choseItem && value!=='.' && value!=='=') {
        item = value;
        onFirst = false;
        usedDot=false;
        choseItem=true;
    }
    else if ((second) && value==='='){
        result = sendItem();
        console.log(result);
    }
    console.log(first, item, second);
}

function addValue(value) {
    if (!first) first=value;
        else if (onFirst) first += value;
        else {
            if (!second) second = value;
            else second += value;
        }
}

function del() {
    if (second) {
        if (second.indexOf('.')===second.length-1){
            usedDot=false;
        }
        second = second.substr(0, second.length-1);
    }
    else if (item) {
        item=undefined;
        choseItem=false;
    }
    else if(first) {
        if (first.indexOf('.')===first.length-1){
            usedDot=false;
        }
        first = first.substr(0, first.length-1);
    }
}

function sendItem() {
    let result;
        if (item==='+') {
            result = operate(first, add, second);
        }
        else if (item==='-') {
            result = operate(first, subtract, second);
        }
        else if (item==='x') {
            result = operate(first, multiply, second);
        }
        else {
            result = operate(first, divide, second);
        }

    return result;
}


let buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        clickReceiver(btn.textContent);
    });
});

let first;
let item;
let second;

let onFirst = true;
let usedDot = false;
choseItem = false;