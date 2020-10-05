const express = require(`express`)
const app = new express.Router()
const userController = require('../../controllers/userController/userController.js')

// Tes inserting new user to collection testing
app.post('/newUser', userController.regUser)


// test inserting many new data to collection
app.post('/userMany', userController.regMany)

// Read all users
app.get('/users', userController.readUser)


// Read 1 users by id
app.get('/user/:id', userController.readId)

// Update 1 user by id
app.patch('/user/:id', userController.updateUser)

// Delete 1 user by id
app.delete('/user/:id', userController.deleteUser)


module.exports = app