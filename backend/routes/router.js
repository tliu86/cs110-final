const express = require('express')
const router = express.Router()

const accountInfo = require("../util/accountInfo")

router.post('/login', async function(req, res) {
    let{userName, password} = req.body;
    const results = await accountInfo.find({userName: userName});
    if(results.length == 1) {
        if(password === results[0].password) {
            console.log("Proper username and password matching.");
        }
        else {
            console.log("Invalid username and password combination. Please try again.")
        }
    }
    else {
        console.log(`A user with the username of ${userName} does not exist. Either log in with the correct username or create an account.`)
    }
})

router.post('/create-new-user', async function(req, res) {
    let {email, userName, password} = req.body;
    const results = await accountInfo.find({$or: [{email: email}, {userName: userName}]});
    if(results.length >= 1) {
        console.log("Email or username already exists. Please choose a different email/username.")
    }
    else {
        const newAccount = new accountInfo({email: email, userName: userName, password: password});
        await newAccount.save();
        console.log(newAccount);
    }
})

module.exports = router 