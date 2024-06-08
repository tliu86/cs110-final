const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    //should try to pull out information from a database that i make around here 
    //connect to database and pull out all the information needed 
    const userData = 
    {

    }

    res.send(userData);
})

module.exports = router 