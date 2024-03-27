const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const validator = require('validator')
const USER_ROLES = require('../utils/constant')

const userSchema = new mongoose.Schema({
    // user_id:{
    //     type: String,
    //     default: uuidv4
    // },
    name:{
        type: String,
        required:[true, 'please provide your name'],
    },
    email:{
        type: String,
        required:[true, 'please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    role:{
        type:String,
        enum:[...Object.values(USER_ROLES)],
        default: Object.values(USER_ROLES.ADMIN)
    },
    password:{
        type: String,
        required:[true, 'please provide a password'],
        minlenght: 8

    },
    //USER_ROLE['USER']
// age
// gender
// marital status

})

const User = mongoose.model('User', userSchema);

module.exports = User;