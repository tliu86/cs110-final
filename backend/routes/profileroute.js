import express from 'express';
import { Register, additionalInfo } from '../models/registerModel.js';

const router = express.Router();

router.get('/user-data/:userName', async (request, response) => {
    // console.log(request.params.userName)
    try {
        const result = await Register.find({username: request.params.userName})
        // // const result = await Register.find({userName: req.params.userName})
        // console.log(result)
        const name = result[0].name 
        const username = result[0].username
        const email = result[0].email
        const gender = result[0].addInfo?.gender
        const age = result[0].addInfo?.age
        const bio = result[0].addInfo?.bio
        const birthDate = result[0].addInfo?.birthDate
    
        response.json({username: username, email: email, name: name, gender: gender, age: age, bio: bio, birthDate: birthDate})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
  });

router.post('/newInfo', async (request, response) => {
    try {
        console.log(request.body)
        let user = request.body.user
        let age = request.body.age
        let gender = request.body.gender
        let bio = request.body.bio 
        let birthDate = request.body.birthDate

        // let {user, age, birthdate, gender, bio} = request.body;
        // // const result = await accountInfo.find({userName: user}, {id_:1});
        const result = await Register.find({username: user}, {_id: 1});
        const correspondingInfo = additionalInfo({age: age, gender: gender, bio: bio, birthDate: birthDate})
        await Register.findOneAndUpdate({'_id': result}, {$set: {'addInfo': correspondingInfo}}); 
        response.status(201).send({message: "good"})
        console.log("okie dokie") //backend good, fix frontend
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Route for Save a new Note

export default router;