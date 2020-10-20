const auth = require('basic-auth')
const compare = require('tsscmp')
const md5 = require('md5')
// console.log(md5('jhon'));

// const check = (name, pass) => {
//     var valid = true
 
//     valid = compare(name, 'john') && valid
//     valid = compare(pass, 'secret') && valid

//     return valid
// }


module.exports = (req, res, next) => {
    let credential = auth(req)
    let name = md5('ujang')
    let pass = md5('abc123456789')
    console.log(name);
    console.log(pass);
    if (!credential) {
        const error = new Error
        error.statusCode = 401
        res.status(401).json({message: 'Tidak diizinkan'})
    }
    else {
        if (credential.name !=  name || credential.pass != pass) {
            const error = new Error('No Authorization');
            error.statusCode = 401
            res.status(401).json({message: 'Wrong username or password'})
            throw error
        }
    }
    next();
}

