import express from 'express';
import { Register, additionalInfo } from '../models/registerModel.js';
import bcrypt from 'bcrypt'
import { getAuth } from 'firebase-admin/auth';

const router = express.Router();

//Route for user registration
router.post('/register', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.username ||
            !request.body.email ||
            (!request.body.password && !request.body.oauth)
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, email, password'
            });
        }
        const email = request.body.email
        const username = request.body.username

        // Checking if it's a new user by email and username
        const existingEmailUser = await Register.findOne({email});
        const existingUsernameUser = await Register.findOne({username});

        if (existingEmailUser || existingUsernameUser) {
            return response.status(400).json({ message: 'Account already exists' });
        }

        var newUser = "";

        if (request.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt);
            newUser = new Register({
                name: request.body.name,
                username: request.body.username,
                email: request.body.email,
                password: hashedPassword,
                addInfo: new additionalInfo({age: 0, gender: '', bio: '', birthDate: 0})
            });
        } else if (request.body.oauth)  {
            const oauthToken = request.body.oauthToken
            const decodedToken = await getAuth().verifyIdToken(oauthToken)
            const oauthId = decodedToken.uid;
            
            if (decodedToken?.email?.toLowerCase() != email.toLowerCase()) {
                return response.status(400).json({ message: 'Email mismatch.' });
            };
 
            newUser = new Register({
                name: request.body.name,
                username: request.body.username,
                email: email,
                oauthID: oauthId
            }); 
        }
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