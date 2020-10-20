const express = require('express')
const app = express()
const port = 2020



// MongoDB Config
const mongodb = require(`mongodb`)
const MongoClient = mongodb.MongoClient
const database = 'test'
const URL = `mongodb://127.0.0.1:27017/${database}`
const mongoose = require(`mongoose`)

// routes import
const userRoutes = require(`./src/routes/user/userRoutes.js`)
const todoRoutes = require('./src/routes/todo/todoRoutes')


app.use(express.json())
app.use(userRoutes)
app.use(todoRoutes)

mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}, (err, client)=>{
    err ? console.log(err) : console.log(`Connected to DB`)

    app.get('/', (req,res)=>{
        res.status(200).send(`<h1>Welcome to Testing API</h1>`)
    })

})








app.listen(port, () => { console.log(`API running at port : ${port}`) })