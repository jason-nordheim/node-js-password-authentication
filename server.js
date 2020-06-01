const express = require('express')
const app = express()
const PORT = 3000; 

app.set('view-engine', 'ejs')

const users = []

app.get('/', (request, response) => {
    response.render('index.ejs', {name: "kyle"})
})

app.get('/login', (request, response) => {
    response.render('login.ejs')
})

app.get('/register', (request, response) => {
  response.render('register.ejs')  
})

app.post('/register',(request, response) => {

})

app.listen(PORT, console.log(`Listening on ${PORT}`))