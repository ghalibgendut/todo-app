const Todo = require('../../models/todoModel/todoModel')
const User = require('../../models/userModel/userModel')

class ConTodo {
    // Buat 1 Todo berdasarkan ID user
    createTodo = async(req,res)=>{
        const owner = req.params.userid
        const description = req.body.description
    
    
        try {
            let todo = new Todo({description, owner})
            let user = await User.findById(owner)
            user.todos.push(todo._id)
            await todo.save()
            await user.save()
            res.status(200).send(todo)
        } catch (err) {
            res.status(500).send({message: err})
        }
    }

    // Read All todo
    readAllTodo = async(req,res)=>{
        try {
            let result = await Todo.find({})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).send({message: err})
        }
    }

    // Read all todo by user id
    readTodoById = async(req,res)=>{
        const id = req.params.userid
    
        try {
            let user = await User.find({_id: id}).populate({
                path: 'todos'
            }).exec()
    
            res.status(200).send(user[0].todos)
    
        } catch (err) {
            res.status(500).send({message: err})
        }
    }

    // Update Todo
    updateTodo = async(req,res)=>{
        // Property yang dikirim
        let key = Object.keys(req.body)
        console.log(key);
    
        // filter untuk property yang dikirim
        let finalKey = key.filter(val => {
            if (!req.body[val]) {
                return false
            }
            else {
                return true
            }
        })
    
        try {
            let todo = await Todo.findById(req.params.id)
            // Update nilai 'completed' di todo dari false ke true
            finalKey.forEach(val => todo[val] = req.body[val])
            // save
            await todo.save()
    
            res.status(200).send(todo)
        } catch (err) {
            res.status(500).send({message: err})
        }
    }

    // Delete Todo
    deleteTodo = async(req,res)=>{
    
        try {
            //Menghapus todo yang sudah ada
            let todo = await Todo.findByIdAndDelete(req.params.id)
            // menghapus array 'todo' yang ada di user
            let user = await User.findById(todo.owner)
            user.todos = user.todos.filter(todoId =>{
                return todo._id !== todoId
            })
            console.log(user);
            console.log(todo);
    
            await user.save()
    
            res.status(200).send(`Data Berhasil di hapus`)
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

module.exports = new ConTodo