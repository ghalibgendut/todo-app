const mongoose = require(`mongoose`)
const database = 'test'
const URL = `mongodb://127.0.0.1:27017/${database}`
const express = require('express')
const app = express()


mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client)=>{
    err ? console.log(err) : console.log(`Connected to DB`)

    app.get('/', (req,res)=>{
        res.status(200).send(`<h1>Welcome to Testing API</h1>`)
    })

})


module.export = mongoose