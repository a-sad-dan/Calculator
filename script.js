// Logic to Toggle light and Dark Mode
let mode = 1; //1 - light 0 - Dark

const light = document.querySelector('#light-btn');
const dark = document.querySelector('#dark-btn');

const btnKeys = document.querySelectorAll('.key');
const btnOperations = document.querySelectorAll(".operation-color");


dark.addEventListener('click', toggleDarkMode);
light.addEventListener('click', toggleLightMode)

function toggleDarkMode() {
    if (mode) {
        mode = 0;
        document.querySelector('html').style.filter = 'invert(0.95)';
        btnKeys.forEach(button => button.style.color = 'var(--button-operation)');
        btnOperations.forEach(button => button.style.color = 'var(--button-key)');
        dark.classList.remove('inactive');
        light.classList.add('inactive');
    }
}
function toggleLightMode() {
    if (!mode) {
        mode = 1;
        document.querySelector('html').style.filter = 'invert(0)';

        btnOperations.forEach(button => button.style.color = 'var(--button-operation)');
        btnKeys.forEach(button => button.style.color = 'var(--button-key)');
        btnOperations.forEach(button => button.style.color = 'var(--button-operation)');

        light.classList.remove('inactive');
        dark.classList.add('inactive');
    }
}



//Logic to Add a color Pallette to the Page using CSS variables

const defaultColor =
{
    background: '#F9F9F9',
    controlBg: '#F2F2F2',
    buttonBg: '#ECECEC',
    buttonKey: '#2BBFA8',
    buttonOperation: '#FF7373'
};

const purple =
{
    background: '#F5ECFD',
    controlBg: '#EDDEFC',
    buttonBg: '#E9D5FB',
    buttonKey: '#8094FF',
    buttonOperation: '#782CC4'
};

const yellow =
{
    background: '#FFFFEB',
    controlBg: '#FFFFD1',
    buttonBg: '#FFFDB2',
    buttonKey: '#307E73',
    buttonOperation: '#EAB11F'
};

const olive =
{
    background: '#F0F4E1',
    controlBg: '#E8EED2',
    buttonBg: '#E0E8C4',
    buttonKey: '#B16E0B',
    buttonOperation: '#1A681D'
};

const red =
{
    background: '#FBDED9',
    controlBg: '#FBD6D0',
    buttonBg: '#FACFC7',
    buttonKey: '#DE6D96',
    buttonOperation: '#DB634C'
};

const aqua =
{
    background: '#ECFDFA',
    controlBg: '#D9FCF7',
    buttonBg: '#C6FAF3',
    buttonKey: '#AD81DA',
    buttonOperation: '#307E73'
};

const acidGreen =
{
    background: '#F4FFE7',
    controlBg: '#EAFFD1',
    buttonBg: '#E1FFBD',
    buttonKey: '#CB9441',
    buttonOperation: '#578B19'
};

const pink =
{
    background: '#FFF8FA',
    controlBg: '#FFF1F5',
    buttonBg: '#FFEAF0',
    buttonKey: '#3A9175',
    buttonOperation: '#E6A5BA'
};

const themes = [defaultColor, purple, yellow, olive, red, aqua, acidGreen, pink];
let themeNumber = 0;

function changeTheme() {
    const color = themes[themeNumber];
    document.documentElement.style.setProperty('--background-color', color.background);
    document.documentElement.style.setProperty('--control-bg', color.controlBg);
    document.documentElement.style.setProperty('--button-bg', color.buttonBg);
    document.documentElement.style.setProperty('--button-key', color.buttonKey);
    document.documentElement.style.setProperty('--button-operation', color.buttonOperation);
}
changeTheme();

//Function to give background color to each swatch

for (let i = 0; i < 8; i++) {
    const currentSwatch = document.querySelector(`.color_${i}`);
    currentSwatch.style.backgroundColor = themes[i].buttonBg;

    currentSwatch.addEventListener('click', () => {
        themeNumber = i;
        changeTheme();
    });
}

// Toggling the sliding of the Theme Picker
const theme = document.querySelector('#theme');

let timeoutId;

theme.addEventListener('click', () => {
    clearTimeout(timeoutId);
    theme.classList.add('slide-out');
    timeoutId = setTimeout(() => {
        theme.classList.remove('slide-out');
    }, 2000)
});

// Removing the theme picker if the calculator is touched
document.querySelector('#main-area').addEventListener('click', () => theme.classList.remove('slide-out'));


// TOTAL NUMBER OF DIGITS = 13 digits

//  LOGIC TO CALCULATE
function add(a, b) {
    const sum = a + b;
    return sum;
}

function subtract(a, b) {
    const difference = a - b;
    return difference;
}

function product(a, b) {
    const product = a * b;
    return product;
}

function divide(a, b) {
    const quotient = a / b;
    return quotient;
}


// Updating the result window when button is clicked

const result = document.querySelector('#result');
const oldCalc = document.querySelector('#old-calc');

const numBtnArr = document.querySelectorAll('.number');
const OperationBtnArr = document.querySelectorAll('.operation-btn');

// const buttonsArr = BtnArr.concat(operationArr);

let isOperationUsed = 1;


numBtnArr.forEach((button) => button.addEventListener('click', () => {
    result.textContent += button.textContent;
    isOperationUsed = 0;
}));

OperationBtnArr.forEach((button) => button.addEventListener('click', () => {
    if (!isOperationUsed) {
        result.textContent += button.textContent;
        isOperationUsed = 1;
    }
    else {
        result.textContent = result.textContent.slice(0, -1) + button.textContent;
    }
}));

function clearScreen() {
    result.textContent = '';
    oldCalc.textContent = '';
}

// To prevent the number from overflowing



// To display Result
function displayResult() {
    let expression = result.textContent;
    const last = expression.slice(-1);
    const isNotDigit = /\D/.test(last);
    if (isNotDigit) {
        expression = expression.slice(0, -1);
    }
    const value = eval(expression);
    result.textContent = value;
    oldCalc.textContent = expression;
}

function backspace() {
    result.textContent = result.textContent.slice(0, -1);
}
result.addEventListener('click', () => {
    result.select();
    result.setSelectionRange(0, 9999); // For mobile devices
    document.execCommand('copy');
})
