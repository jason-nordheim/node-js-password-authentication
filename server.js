/*
    Load in our process variables if we are in
    NOT in the production environment
*/ 
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const app = express()
const PORT = 3000 

const users = []


const initializePassport = require('./passport-config')
initializePassport(passport, email => users.find(user => user.email === email))

app.set('view-engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // allows access to form data as part of the request 

// setup passport 
app.use(flash()) 
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,  // re-save values, even if they have not changed 
    saveUninitialized: false // save unused values 
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index.ejs', {name: "kyle"})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // what to do when authentication is successful 
    failureRedirect: '/login',  // what to do when authentication fails 
    failureFlash: true  // should display error messages provided in the done function
})) 

app.get('/register', (req, res) => {
  res.render('register.ejs')  
})

app.post('/register', async (req, res) => {
    try {
        //const user = { name: req.body.gitname, password: req.body.password }
        const hashedPassword = await bcrypt.hash(req.body.password, 12) 
        users.push({
            id: Date.now().toString(), 
            name: req.body.name, 
            email: req.body.email, 
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
    }
    console.log(users)
})

app.listen(PORT, console.log(`Listening on ${PORT}`))