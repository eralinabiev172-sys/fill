const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');
const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
    const isValid = regExp.test(gmailInput.value.trim());
    gmailResult.textContent = isValid ? 'Gmail корректный' : 'Нужен адрес вида name@gmail.com';
    gmailResult.className = `checker ${isValid ? 'status_success' : 'status_error'}`;
};

const childBlock = document.querySelector('.child_block');
const parentBlock = document.querySelector('.parent_block');
let positionX = 0;
let positionY = 0;
let direction = 'right';
const step = 4;

function moveBlock() {
    const maxSizeX = parentBlock.clientWidth - childBlock.clientWidth;
    const maxSizeY = parentBlock.clientHeight - childBlock.clientHeight;

    if (direction === 'right') {
        positionX += step;
        if (positionX >= maxSizeX) {
            positionX = maxSizeX;
            direction = 'down';
        }
    } else if (direction === 'down') {
        positionY += step;
        if (positionY >= maxSizeY) {
            positionY = maxSizeY;
            direction = 'left';
        }
    } else if (direction === 'left') {
        positionX -= step;
        if (positionX <= 0) {
            positionX = 0;
            direction = 'up';
        }
    } else if (direction === 'up') {
        positionY -= step;
        if (positionY <= 0) {
            positionY = 0;
            direction = 'right';
        }
    }

    childBlock.style.left = `${positionX}px`;
    childBlock.style.top = `${positionY}px`;

    requestAnimationFrame(moveBlock);
}

moveBlock();

const secondsSpan = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

let counter = 0;
let intervalId = null;

startButton.onclick = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        counter += 1;
        secondsSpan.textContent = counter;
    }, 1000);
};

stopButton.onclick = () => clearInterval(intervalId);

resetButton.onclick = () => {
    clearInterval(intervalId);
    counter = 0;
    secondsSpan.textContent = counter;
};
