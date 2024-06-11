import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Register } from '../models/registerModel.js';
import { getAuth } from 'firebase-admin/auth';

const router = express.Router();


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("yo, we need a token, please give it to us next time!")
    } else {
        jwt.verify(token, "abcde", (err, decoded) => {
            if (err) {
                res.json({auth: false, message: "U failed to authenticate"})
            } else {
                req.userId = decoded.id
                next();
            }

        })
    }
}

router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.json({auth: true, message: "You are authenticated!"})
})


router.post("/login", async (request, response) => {
    try {
        if (
            !request.body.email ||
            (!request.body.password && !request.body.oauth)
        ) {
            return response.status(400).send({
                message: 'Send all required fields: email and password'
            });
        }

        const email = request.body.email

        const user = await Register.findOne({ email });
        
        if (user) {
            var isMatch;

            if (request.body.oauth) {
                const oauthToken = request.body.oauthToken
                const decodedToken = await getAuth().verifyIdToken(oauthToken)
                const oauthId = decodedToken.uid;

                if (user.oauthID != oauthId) {
                    return response.json({fail: 'Invalid oauth.', auth: false});
                }
                isMatch = true;
            } else {
                const password = request.body.password
                isMatch = await bcrypt.compare(password, user.password);

                if (!isMatch) return response.json({fail: 'The password is incorrect', auth: false});
            }
            if (isMatch) {
                const token = jwt.sign({ id: user.id }, 'abcde', { expiresIn: '1h' });
                
                 response.json({
                    success: "Success", 
                    auth: true, 
                    token: token, 
                    email: email, 
                    userID: user.id,
                    username: user.username
                });
            } else {
                 response.json({fail: 'The password is incorrect', auth: false});
            }
        } else {
            response.json({fail: "Email not registered", auth: false});
        }

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export {router, verifyJWT};