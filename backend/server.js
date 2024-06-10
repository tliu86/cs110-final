import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Note} from "./models/noteModel.js";
import notesRoute from './routes/notesRoute.js';
import registerRoute from './routes/registerRoute.js'
import loginRoute from './routes/loginRoute.js'
import cors from "cors";

const app = express();


//Middleware for parsing request body

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {

    response.status(234).send("Hello World");
});

app.use('/notes', notesRoute);

app.use('/api', registerRoute);

app.use('/api', loginRoute);


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`)
        });
    })
    .catch((err) => {
        console.log(err);
    })
