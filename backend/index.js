const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const corsOptions = {
    origin: '*', 
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router)

//front end runs on 3000 
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

