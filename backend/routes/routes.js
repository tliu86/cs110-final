const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    //should try to pull out information from a database that i make around here 
    //connect to database and pull out all the information needed 
    const userData = 
    [
        {
            "id": 1,
            "username": "Unkillable Demon King",
            "team": "T1",
            "league": "LCK",
            "main": "Ahri",
            "tft": false,
        },
        {
            "id": 2,
            "username": "Salty",
            "team": "N/A",
            "league": "N/A",
            "main": "Thresh",
            "tft": true
        }
    ]

    res.send(userData);
})

module.exports = router 