import express from 'express';
import { Register } from '../models/registerModel.js';

const router = express.Router();

//Route for user registration
router.post('/register', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, email, password'
            });
        }
        const email = request.body.email
        // Checking if it's a new user
        const existingUser = await Register.findOne({email});
        if (existingUser) {
            return response.status(400).json({ message: 'User already exists' });
        }

        const newUser = new Register({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        });
         // Save the new user to the database
         const savedUser = await newUser.save();

         // Respond with the saved user data
         response.status(201).json(savedUser);

        
    
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
  });
  
  // Route for Get All notes from database
router.get('/register', async (request, response) => {
    try{
        const users = await Register.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})
  export default router;