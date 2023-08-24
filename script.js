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
    return item(parseFloat(first), parseFloat(second));
}

function negative(value) {
    if (onFirst && !first) {
        addValue(value);
        addToScreen(value);
    }
    else if (!onFirst && !second) {
        addValue(value);
        addToScreen(value);
    }
}

function clickReceiver(value) {
    if (value==='-') {
        negative(value);
    }
    if (!isNaN(value)) {
        addValue(value);
        addToScreen(value);
    }
    else if (value==='.') {
        if (onFirst) {
            if (first && first.includes('.')) return;
        }
        else if (second && second.includes('.')) return;
        addValue(value);
        addToScreen(value);
    }
    else if (value==='DEL') {
        del();
        addToScreen(value);
    }
    else if (value==='AC') {
        ac();
    }
    else if (!item && value!=='.' && value!=='=' && !isNaN(first)) {
        addToScreen(value);
        item = value;
        onFirst = false;
    }
    else if ((second) && value==='='){
        doneCalc = true;
        sendItem();
    }
}

function ac() {
    first=undefined;
    second=undefined;
    item=undefined;
    onFirst=true;
    addToScreen('AC');
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
        second = second.substr(0, second.length-1);
    }
    else if (item) {
        item=undefined;
        onFirst=true;
    }
    else if(first) {
        first = first.toString()
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

    finish(result);
}

function addToScreen(value) {

    if (value==='DEL') {
        let parent = document.getElementById('text-cnt');
        if (parent.firstChild) parent.removeChild(parent.lastChild);
    }
    else if (value==='AC') {
        let parent = document.getElementById('text-cnt');
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
    }
    else {   
        let screenVal = document.createElement('p');
        screenVal.classList.add('screenText');
        let node = document.createTextNode(value);
        screenVal.appendChild(node);

        let papa = document.getElementById('text-cnt');
        papa.appendChild(screenVal);
    }
}

function finish(value) {
    ac();
    first=value;
    addToScreen(value);
}

let buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        clickReceiver(btn.textContent);
    });
});

let first;
let item;
let second;

let onFirst = true;