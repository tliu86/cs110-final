const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./routes/router.js')
const app = express()
const mongoose = require("mongoose");

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// const corsOptions = {
//     origin: '*', 
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const uri = "mongodb+srv://tyliu2111:heyPleaseW0rk@database.j3ryhza.mongodb.net/?retryWrites=true&w=majority&appName=Database"

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. Successfully connected to MongoDB!");
      
      //lets try to make a new user on the site: 
      
    } finally {
      //   await mongoose.disconnect();
    }
  }
  
  run().catch(console.dir);

app.use('/', router)
//remember how requests work 

//front end runs on 3000 
const port = 8080;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

