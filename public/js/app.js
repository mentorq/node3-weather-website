// const { response } = require("express")

console.log('Client side javascript is loaded!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = '/weather?address=' + location
    console.log('CURRENT LOCATION' + url)
    messageOne.textContent = 'Loading your data'
    messageTwo.textContent = ''
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageTwo.textContent = data.error
        } else{
            console.log(data)
            messageTwo.textContent = 'In ' + data.location + ' weather is ' + data.forecast
        }
    })
})
})