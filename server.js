const express = require('express')
const app = express()

const users = []

app.get('/users', (request, response) => {
    response.json(users) 
})


app.listen(3000)