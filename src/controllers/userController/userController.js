const User = require(`../../models/userModel/userModel`)
const UserService = require(`../../services/userService/userService`)
const bcrypt = require('bcrypt')

class ConUser {

    // Register user
    regUser = async (req, res) => {
        const user = new User(req.body)

        try {
            user.password = bcrypt.hashSync(user.password, 8)
            let result = await user.save()
            res.status(200).send(result)

        } catch (err) {
            res.status(500).send({ message: err })
        }
    }

    // Register Many User
    regMany = async (req, res) => {
        let userData = req.body
        try {
            let result = await User.insertMany(userData)
            res.status(200).send({ result })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }

    // Read All user
    readUser = async (req, res) => {
        try {
            let result = await User.find({})
            res.status(200).send({ result })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }

    // Read 1 user by id
    readId = async (req, res) => {
        const _id = req.params.id

        try {
            let result = await User.findById(_id)
            !result ? res.status(404).send(`User dengan Id ${_id} tidak ditemukan`) : res.status(200).send({ result })

        } catch (err) {
            res.status(500).send({message: err })
        }
    }

    // Update 1 user by id
    updateUser = async(req,res)=>{
        const _id = req.params.id
        const user = req.body
        
        let key = Object.keys(user)
        console.log(key);
        let finalKeys = key.filter(val => {
            if(!req.body[val]){
                return false
            }
            else {
                return true
            }
            // let condition = req.body[val] === undefined ? false : req.body[val] === "" ? false : true ==> kodisi ternary multiple condition
        })
        try {
            let data = await User.findById(_id)
            finalKeys.forEach(val=> data[val] = req.body[val])
            await data.save()
            res.status(200).send(`user dengan ${_id} berhasil diubah`)
        } catch (err) {
            res.status(500).send({err})
        }
    }

    // Delete 1 user by id
    deleteUser = async(req,res)=>{
        const _id = req.params.id
    
        try {
            let data = await User.findByIdAndDelete(_id)
            if (!data) {
                return res.status(404).send(`User dengan Id ${_id} tidak ditemukan`)
            }
            res.status(200).send(`user dengan ${_id} berhasil di hapus`)
        } catch (err) {
            res.status(500).send({message: err})
        }
    }
}





module.exports = new ConUser
