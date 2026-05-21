// PHONE CHECKER (Твой код)
const phoneInputField = document.querySelector('#phone_input')
const phoneButtonField = document.querySelector('#phone_button')
const phoneSpanField = document.querySelector('#phone_result')

const phonePattern = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButtonField.addEventListener('click', () =>
{
  if (phonePattern.test(phoneInputField.value))
  {
    phoneSpanField.innerHTML = 'OK'
    phoneSpanField.style.color = 'green'
  }
  else
  {
    phoneSpanField.innerHTML = 'NOT OK'
    phoneSpanField.style.color = 'red'
  }
})

// TAB SLIDER
const tabItems = document.querySelectorAll('.tab_content_item')
const tabBlocks = document.querySelectorAll('.tab_content_block')
const tabWrapper = document.querySelector('.tab_content_items')

function hideTabs()
{
  tabBlocks.forEach(block => block.style.display = 'none')
  tabItems.forEach(item => item.classList.remove('tab_content_item_active'))
}

function showTab(position = 0)
{
  tabBlocks[position].style.display = 'block'
  tabItems[position].classList.add('tab_content_item_active')
}

hideTabs()
showTab()

tabWrapper.onclick = (e) =>
{
  if (e.target && e.target.classList.contains('tab_content_item'))
  {
    tabItems.forEach((elem, idx) =>
    {
      if (e.target === elem)
      {
        hideTabs()
        showTab(idx)
      }
    })
  }
}

// CONVERTER
const somElement = document.querySelector('#som')
const usdElement = document.querySelector('#usd')
const eurElement = document.querySelector('#eur')

function handleConversion(source, targetA, targetB)
{
  source.oninput = () =>
  {
    fetch('../data/data.json')
      .then(res => res.json())
      .then(data =>
      {
        if (source === somElement)
        {
          targetA.value = (source.value / data.currency.usd).toFixed(2)
          targetB.value = (source.value / data.currency.eur).toFixed(2)
        }
        else if (source === usdElement)
        {
          targetA.value = (source.value * data.currency.usd).toFixed(2)
          targetB.value = (source.value * (data.currency.usd / data.currency.eur)).toFixed(2)
        }
        else if (source === eurElement)
        {
          targetA.value = (source.value * data.currency.eur).toFixed(2)
          targetB.value = (source.value * (data.currency.eur / data.currency.usd)).toFixed(2)
        }

        if (source.value === '')
        {
          targetA.value = ''
          targetB.value = ''
        }
      })
  }
}

handleConversion(somElement, usdElement, eurElement)
handleConversion(usdElement, somElement, eurElement)
handleConversion(eurElement, somElement, usdElement)

// CARD SWITCHER (JSONPlaceholder)
const cardContainer = document.querySelector('.card')
const prevBtn = document.querySelector('#btn-prev')
const nextBtn = document.querySelector('#btn-next')
let idCounter = 1

function getCard(idNum)
{
  fetch(`https://jsonplaceholder.typicode.com/todos/${idNum}`)
    .then(res => res.json())
    .then(data =>
    {
      cardContainer.innerHTML =
        `<p>${data.title}</p>
         <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
         <span>${data.id}</span>`
    })
}

nextBtn.onclick = () =>
{
  idCounter++
  if (idCounter > 200) idCounter = 1
  getCard(idCounter)
}

prevBtn.onclick = () =>
{
  idCounter--
  if (idCounter < 1) idCounter = 200
  getCard(idCounter)
}

getCard(idCounter)

// WEATHER
const cityInput = document.querySelector('.cityName')
const cityOutput = document.querySelector('.city')
const tempOutput = document.querySelector('.temp')

const weatherAPI = 'https://api.openweathermap.org/data/2.5/weather'
const apiKeyValue = 'e417df621041e2a111c13af2ba2d2f00'

cityInput.oninput = (event) =>
{
  const cityText = event.target.value.trim()

  if (cityText.length > 2)
  {
    fetch(`${weatherAPI}?q=${cityText}&appid=${apiKeyValue}&units=metric&lang=ru`)
      .then(response =>
      {
        if (!response.ok) throw new Error('Город не найден')
        return response.json()
      })
      .then(data =>
      {
        cityOutput.innerHTML = data.name
        tempOutput.innerHTML = Math.round(data.main.temp) + '°C'
      })
      .catch(() =>
      {
        cityOutput.innerHTML = 'Город не найден'
        tempOutput.innerHTML = ''
      })
  }
  else
  {
    cityOutput.innerHTML = ''
    tempOutput.innerHTML = ''
  }
}