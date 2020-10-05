const express = require('express')
const app = new express.Router()
const todoController = require('../../controllers/todoController/todoController.js')


// Create todo
app.post('/todo/:userid', todoController.createTodo)



// Read all todo
app.get('/todo', todoController.readAllTodo)


// Read todo by user id
app.get('/todo/:userid', todoController.readTodoById)

// Update todo
app.patch('/todo/:id', todoController.updateTodo)

// Delete todo
app.delete('/todo/:id', todoController.deleteTodo)






module.exports = app