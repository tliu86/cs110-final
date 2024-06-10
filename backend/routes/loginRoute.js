import express from 'express';
import { Register } from '../models/registerModel.js';

const router = express.Router();

router.post("/login", async (request, response) => {
    try {
        if (
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Send all required fields: email and password'
            });
        }
        const email = request.body.email
        const password = request.body.password
        const user = await Register.findOne({ email });
        if (user) {
            if (user.password === password) {
                response.json("Success");
            } else {
                response.json('The password is incorrect');
            }
        } else {
            response.json("Email not registered");
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

  export default router;