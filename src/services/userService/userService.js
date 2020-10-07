const bcrypt = require('bcrypt')
const UserController = require(`../../controllers/userController/userController.js`)

class userService {
    userPassword = (password)=>{
        // try {
            const userPass = password
            const hashRes = bcrypt.hashSync(userPass, 8)
            return hashRes
            
            // let result = userPass
            // console.log(result);
            // res.status(200).send(result)
        // } catch (err) {
        //     console.log({message: err.message});
        // }
        
    }
}

module.exports = new userService


