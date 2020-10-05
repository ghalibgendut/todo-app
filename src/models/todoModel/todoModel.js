const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(val){
            let result = isNaN(parseInt(val))
            if (!result) throw new Error (`Username tidak boleh angka`)
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'testing'
    }
}, {timestamps: true})

const Todo = mongoose.model('todo', todoSchema, 'todo')
module.exports = Todo