const express = require('express')
const bodyParser = require('body-parser')
const apiRoute = require('./routes/routes.js')
const app = express()


// Config
    // Body Parse
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

// Rotas
    app.use('/api',apiRoute)
    

app.listen(3333 , '0.0.0.0', ()=>{console.log('Servidor rodando na url = localhost:3333')})