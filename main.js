const calculator = {

    calculation: () => {},

    numbers: () => {}
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
            }
        };

        if (operation != 'reset' && operation != 'result') {
            operator = switchFn(operation);
        }

        if (!input.value && 
        operation != 'reset' &&
        operation != 'result') return;
        result.disabled = false;

        switch (operation) {
            case 'add':
                resultStorage += +input.value;              
                break;
            case 'subtract':
                if(!iterator){
                    resultStorage = +input.value;
                } else {
                resultStorage -= +input.value;
                }
                break;
            case 'multiply':
                if(!iterator){
                    resultStorage = +input.value;
                } else {
                    resultStorage *= +input.value;
                }
                break;
            case 'divide':
                if(!iterator){
                    resultStorage = +input.value;
                } else {
                    resultStorage /= +input.value;
                }
                break;
            case 'reset':
                input.value = '';
                break;
            case 'result':
                result.disabled = true;
                let inputValue = +input.value;

                switch (operator) {
                    case 'addition':
                        resultStorage += +inputValue;
                        break;
                    case 'subtraction':
                        resultStorage -= +inputValue;            
                       break;
                    case 'multiplication':
                        resultStorage *= +inputValue;           
                       break;
                    case 'division':
                        resultStorage /= +inputValue;
                       break;
                }
                input.value = resultStorage;
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
                numStorage = '';
                break;
                
            case 'reset':
            case 'result':    
                span.innerHTML = 0;
                resultStorage = 0;
                iterator = 0;
                numStorage = '';
        }
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
