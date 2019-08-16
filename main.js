const calculator = {

    calculation: () => {},

    numbers: () => {},

    addition: () => {},

    subtraction: () => {},

    multiplication: () => {},

    division: () => {},

    reset: () => {}
}

const main = () => {
    const actButton = document.querySelector('#allButtons');
    const input = document.querySelector('#value');
    const span = document.querySelector('span');
    const numbers = document.querySelector('#numbers');
    const result = document.querySelector('#result');

    
    
    span.innerHTML = 0;
    let resultStorage = 0;
    let iterator = 0;
    let numStorage = '';
    let operator = '';

    calculator.reset = () => {
        span.innerHTML = 0;
        resultStorage = 0;
        iterator = 0; 
    };

    calculator.addition = (resultStorage, inputValue) => {
        resultStorage += inputValue; 
        return resultStorage;
    };

    calculator.subtraction = (resultStorage, inputValue) => {
        if (!iterator) {
            resultStorage = +inputValue;
        } else {
            resultStorage -= inputValue;
        }
        return resultStorage
    };

    calculator.multiplication = (resultStorage, inputValue) => {
        if (!iterator) {
            resultStorage = +inputValue;
        } else {
            resultStorage *= inputValue;
        }
        return resultStorage
    };

    calculator.division = (resultStorage, inputValue) => {
        if (!iterator) {
            resultStorage = +inputValue;
        } else {
            resultStorage /= inputValue;
        }
        return resultStorage
    };

    calculator.calculation = (e) => {
        const operation = e.target.dataset.operation;
        if (!operation) return;    

        const switchFn = buttonValue => {
            switch (buttonValue) {
                case 'add':
                    return 'addition';
                case 'subtract':
                    return 'subtraction';
                case 'multiply':
                    return 'multiplication';
                case 'divide':
                    return 'division'; 
                case 'reset':
                    return 'reset';
            }
        };

        if (operation != 'result') {
            operator = switchFn(operation);
        }

        if (!input.value && 
        operation != 'reset' &&
        operation != 'result') return;
        result.disabled = false;

        switch (operator) {
            case 'addition':
                resultStorage = calculator.addition(resultStorage, +input.value);
                break;
            case 'subtraction':
                resultStorage = calculator.subtraction(resultStorage, +input.value);          
                break;
            case 'multiplication':
                resultStorage = calculator.multiplication(resultStorage, +input.value);          
                break;
            case 'division':
                resultStorage = calculator.division(resultStorage, +input.value);          
                break;
            case 'reset':
                input.value = '';          
                break;
        }   

        switch (operation) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide': 
                span.innerHTML = +resultStorage;
                input.value = '';
                iterator++;         
                break;
            case 'reset':
                calculator.reset();
                break;
            case 'result':   
                input.value = resultStorage; 
                calculator.reset();
        }
        numStorage = '';
    };
   
    calculator.numbers = (e) => {
        const operation = e.target.dataset.operation;
        if (!operation) return;

        if (operation == 0 && !numStorage) {
            numStorage = '';
        } else {
            numStorage += operation;
        }    
    
        input.value = +numStorage;
    };

    actButton.addEventListener('click', calculator.calculation);
    numbers.addEventListener('click', calculator.numbers);
};

document.addEventListener('DOMContentLoaded', main);
