// PHONE CHECKER (Твой код)
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const phoneRegex = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () =>
{
  if (phoneRegex.test(phoneInput.value))
  {
    phoneSpan.innerHTML = 'OK'
    phoneSpan.style.color = 'green'
  }
  else
  {
    phoneSpan.innerHTML = 'NOT OK'
    phoneSpan.style.color = 'red'
  }
})

// TAB SLIDER
const allTabs = document.querySelectorAll('.tab_content_item')
const allContents = document.querySelectorAll('.tab_content_block')
const tabsContainer = document.querySelector('.tab_content_items')

function hideAllTabs()
{
  allContents.forEach(el => el.style.display = 'none')
  allTabs.forEach(el => el.classList.remove('tab_content_item_active'))
}

function showTabByIndex(index = 0)
{
  allContents[index].style.display = 'block'
  allTabs[index].classList.add('tab_content_item_active')
}

hideAllTabs()
showTabByIndex()

tabsContainer.onclick = (event) =>
{
  if (event.target && event.target.classList.contains('tab_content_item'))
  {
    allTabs.forEach((item, idx) =>
    {
      if (event.target === item)
      {
        hideAllTabs()
        showTabByIndex(idx)
      }
    })
  }
}

// CONVERTER
const somField = document.querySelector('#som')
const usdField = document.querySelector('#usd')
const eurField = document.querySelector('#eur')

function converter(primary, secondary, tertiary)
{
  primary.oninput = () =>
  {
    fetch('../data/data.json')
      .then(res => res.json())
      .then(data =>
      {
        if (primary === somField)
        {
          secondary.value = (primary.value / data.currency.usd).toFixed(2)
          tertiary.value = (primary.value / data.currency.eur).toFixed(2)
        }
        else if (primary === usdField)
        {
          secondary.value = (primary.value * data.currency.usd).toFixed(2)
          tertiary.value = (primary.value * (data.currency.usd / data.currency.eur)).toFixed(2)
        }
        else if (primary === eurField)
        {
          secondary.value = (primary.value * data.currency.eur).toFixed(2)
          tertiary.value = (primary.value * (data.currency.eur / data.currency.usd)).toFixed(2)
        }

        if (primary.value === '')
        {
          secondary.value = ''
          tertiary.value = ''
        }
      })
  }
}

converter(somField, usdField, eurField)
converter(usdField, somField, eurField)
converter(eurField, somField, usdField)

// CARD SWITCHER (JSONPlaceholder)
const cardBlock = document.querySelector('.card')
const prevButton = document.querySelector('#btn-prev')
const nextButton = document.querySelector('#btn-next')
let currentId = 1

function loadCard(id)
{
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => res.json())
    .then(data =>
    {
      cardBlock.innerHTML =
        `<p>${data.title}</p>
         <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
         <span>${data.id}</span>`
    })
}

nextButton.onclick = () =>
{
  currentId++
  if (currentId > 200) currentId = 1
  loadCard(currentId)
}

prevButton.onclick = () =>
{
  currentId--
  if (currentId < 1) currentId = 200
  loadCard(currentId)
}

loadCard(currentId)

// WEATHER
const cityField = document.querySelector('.cityName')
const cityNameSpan = document.querySelector('.city')
const tempSpan = document.querySelector('.temp')

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherKey = 'e417df621041e2a111c13af2ba2d2f00'

cityField.oninput = (event) =>
{
  const cityValue = event.target.value.trim()

  if (cityValue.length > 2)
  {
    fetch(`${weatherUrl}?q=${cityValue}&appid=${weatherKey}&units=metric&lang=ru`)
      .then(response =>
      {
        if (!response.ok) throw new Error('Город не найден')
        return response.json()
      })
      .then(data =>
      {
        cityNameSpan.innerHTML = data.name
        tempSpan.innerHTML = Math.round(data.main.temp) + '°C'
      })
      .catch(() =>
      {
        cityNameSpan.innerHTML = 'Город не найден'
        tempSpan.innerHTML = ''
      })
  }
  else
  {
    cityNameSpan.innerHTML = ''
    tempSpan.innerHTML = ''
  }
}