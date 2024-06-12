import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Note} from "./models/noteModel.js";
import notesRoute from './routes/notesRoute.js';
import registerRoute from './routes/registerRoute.js'
import {router as loginRoute} from './routes/loginRoute.js'
import { initializeApp } from 'firebase-admin/app';
import profileRoute from "./routes/profileroute.js"
import cors from "cors";

const app = express();

import serviceAccount from "./serviceAccountKey.json" with { type: "json" };
//change assert to with 
//may be different on non mac
import credential from "firebase-admin";

const firebaseApp = initializeApp({
    credential: credential.credential.cert(serviceAccount)
});

//Middleware for parsing request body

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {

    response.status(234).send("Hello World");
});

app.use('/notes', notesRoute);

app.use('/api', registerRoute);

app.use('/api', loginRoute);

app.use('/uploads', express.static('uploads'))

app.get('/user-data/:userName', profileRoute)

app.post('/newInfo', profileRoute)

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
