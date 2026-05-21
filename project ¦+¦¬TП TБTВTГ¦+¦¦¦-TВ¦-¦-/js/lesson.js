const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const phoneRegex = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.addEventListener('click', () => {
    const isValid = phoneRegex.test(phoneInput.value.trim());
    phoneSpan.textContent = isValid ? 'Номер введён корректно' : 'Формат неверный';
    phoneSpan.className = `checker ${isValid ? 'status_success' : 'status_error'}`;
});

const allTabs = document.querySelectorAll('.tab_content_item');
const allContents = document.querySelectorAll('.tab_content_block');
const tabsContainer = document.querySelector('.tab_content_items');

function hideAllTabs() {
    allContents.forEach((el) => {
        el.style.display = 'none';
    });

    allTabs.forEach((el) => {
        el.classList.remove('tab_content_item_active');
    });
}

function showTabByIndex(index = 0) {
    allContents[index].style.display = 'block';
    allTabs[index].classList.add('tab_content_item_active');
}

hideAllTabs();
showTabByIndex();

tabsContainer.onclick = (event) => {
    if (event.target && event.target.classList.contains('tab_content_item')) {
        allTabs.forEach((item, idx) => {
            if (event.target === item) {
                hideAllTabs();
                showTabByIndex(idx);
            }
        });
    }
};

const somField = document.querySelector('#som');
const usdField = document.querySelector('#usd');
const eurField = document.querySelector('#eur');
let currencyRates = null;

async function getCurrencyRates() {
    if (currencyRates) {
        return currencyRates;
    }

    const response = await fetch('../data/data.json');
    const data = await response.json();
    currencyRates = data.currency;
    return currencyRates;
}

function clearFields(...fields) {
    fields.forEach((field) => {
        field.value = '';
    });
}

function converter(primary, secondary, tertiary) {
    primary.oninput = async () => {
        if (primary.value === '') {
            clearFields(secondary, tertiary);
            return;
        }

        const rates = await getCurrencyRates();

        if (primary === somField) {
            secondary.value = (primary.value / rates.usd).toFixed(2);
            tertiary.value = (primary.value / rates.eur).toFixed(2);
        } else if (primary === usdField) {
            secondary.value = (primary.value * rates.usd).toFixed(2);
            tertiary.value = (primary.value * (rates.usd / rates.eur)).toFixed(2);
        } else if (primary === eurField) {
            secondary.value = (primary.value * rates.eur).toFixed(2);
            tertiary.value = (primary.value * (rates.eur / rates.usd)).toFixed(2);
        }
    };
}

converter(somField, usdField, eurField);
converter(usdField, somField, eurField);
converter(eurField, somField, usdField);

const cardBlock = document.querySelector('.card');
const prevButton = document.querySelector('#btn-prev');
const nextButton = document.querySelector('#btn-next');
let currentId = 1;

async function loadCard(id) {
    cardBlock.innerHTML = '<p>Загрузка карточки...</p>';

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        const data = await response.json();

        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p class="${data.completed ? 'status_success' : 'status_error'}">${data.completed ? 'Completed' : 'In progress'}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        cardBlock.innerHTML = '<p>Не удалось загрузить данные.</p>';
    }
}

nextButton.onclick = () => {
    currentId = currentId >= 200 ? 1 : currentId + 1;
    loadCard(currentId);
};

prevButton.onclick = () => {
    currentId = currentId <= 1 ? 200 : currentId - 1;
    loadCard(currentId);
};

loadCard(currentId);

const cityField = document.querySelector('.cityName');
const cityNameSpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherKey = 'e417df621041e2a111c13af2ba2d2f00';

cityField.oninput = async (event) => {
    const cityValue = event.target.value.trim();

    if (cityValue.length <= 2) {
        cityNameSpan.textContent = '';
        tempSpan.textContent = '';
        return;
    }

    cityNameSpan.textContent = 'Ищу город...';
    tempSpan.textContent = '';

    try {
        const response = await fetch(`${weatherUrl}?q=${cityValue}&appid=${weatherKey}&units=metric&lang=ru`);

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        cityNameSpan.textContent = data.name;
        tempSpan.textContent = `${Math.round(data.main.temp)}°C`;
    } catch (error) {
        cityNameSpan.textContent = 'Город не найден';
        tempSpan.textContent = '';
    }
};
