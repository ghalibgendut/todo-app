const bcrypt = require('bcrypt')
const UserModel = require(`../../models/userModel/userModel.js`)

class userService {
    createUser = async(data)=>{
        try {
            const user = new UserModel()
            const hashRes = bcrypt.hashSync(data.password, 8)
            user.nama = data.nama
            user.umur = data.umur
            user.alamat = data.alamat
            user.username = data.username
            user.email = data.email
            user.password = hashRes
            await user.save()
            return 'Berhasil'
        } catch (err) {
            return console.log(err.message);
        }
    }

}

module.exports = new userService


