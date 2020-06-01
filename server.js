const express = require('express')
const app = express()

app.use(express.json)

const users = []

app.get('/users', (request, response) => {
    response.json(users) 
})


app.post('/users', (request, response) => {
    const user = { 
        name: request.body.name, 
        password: request.body.password 
    }
    users.push(user)
    response.status(201).send()
})

app.listen(3000)