// GMAIL CHECKER
const gmailInput = document.querySelector('#gmail_input')
  , gmailButton = document.querySelector('#gmail_button')
  , gmailResult = document.querySelector('#gmail_result')
  , regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
;

gmailButton.onclick = () =>
{
  if (regExp.test(gmailInput.value))
  {
    gmailResult.innerHTML = 'OK'
    gmailResult.style.color = 'green'
  }
  else
  {
    gmailResult.innerHTML = 'NOT OK'
    gmailResult.style.color = 'red'
  }
}

// MOVE BLOCK (Recursion)
const childBlock = document.querySelector('.child_block')
let positionX = 0
let positionY = 0
const maxSize = 448
const step = 4

function moveBlock()
{
  if (positionX < maxSize && positionY === 0)
  {
    positionX += step
  }
  else if (positionX >= maxSize && positionY < maxSize)
  {
    positionY += step
  }
  else if (positionY >= maxSize && positionX > 0)
  {
    positionX -= step
  }
  else if (positionX <= 0 && positionY > 0)
  {
    positionY -= step
  }

  childBlock.style.left = positionX + 'px'
  childBlock.style.top = positionY + 'px'

  requestAnimationFrame(moveBlock)
}

moveBlock()

// STOPWATCH
const secondsSpan = document.querySelector('#seconds')
  , startButton = document.querySelector('#start')
  , stopButton = document.querySelector('#stop')
  , resetButton = document.querySelector('#reset')
;

let counter = 0
let intervalId

startButton.onclick = () =>
{
  clearInterval(intervalId)
  intervalId = setInterval(() =>
  {
    counter++
    secondsSpan.innerHTML = counter
  }, 1000)
}

stopButton.onclick = () => clearInterval(intervalId)

resetButton.onclick = () =>
{
  clearInterval(intervalId)
  counter = 0
  secondsSpan.innerHTML = counter
}