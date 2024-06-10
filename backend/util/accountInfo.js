const mongoose = require('mongoose')

const accountInfoSchema = new mongoose.Schema({
    email: String,
    userName: String, 
    password: String
})

const accountInfo = mongoose.model('accountInfo', accountInfoSchema)

module.exports = accountInfo