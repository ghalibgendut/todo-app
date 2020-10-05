const mongoose = require(`mongoose`)
const validator = require('validator')

const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            let result = isNaN(parseInt(val))
            if(!result) throw new Error("Nama tidak boleh angka")
        }
    },
    umur: {
        type: Number,
        default: 0,
        set: val => parseInt(val)
    },
    alamat: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true,
        unique: true,
        set: val => val.replace(/ /g, ""), // Akan menggantikan semua spasi dengan string kosong yang ada diantara karakter
        validate(value) { // Handle jika yang di input user bukan sebuah string

            let result = isNaN(parseInt(value))

            if (!result) {
                throw new Error("Username tidak boleh angka")
            }

        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, // Akan mengubah data menjadi huruf kecil semua
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email tidak valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'todo'
    }]
})

const User = mongoose.model('testing', userSchema , 'testing')
module.exports = User