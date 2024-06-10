import express from 'express';
import { Note } from '../models/noteModel.js';

const router = express.Router();


//Route for Save a new Note
router.post('/', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.subject ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, subject, publishYear',
            })
        }

        const newNote = {
            title: request.body.title,
            author: request.body.author,
            subject: request.body.subject,
            publishYear: request.body.publishYear
        };

        const note = await Note.create(newNote);

        return response.status(201).send(note);


    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route for Get All notes from database
router.get('/', async (request, response) => {
    try{
        const notes = await Note.find({});

        return response.status(200).json({
            count: notes.length,
            data: notes
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


// Route for Get One Note from database by id
router.get('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);

        return response.status(200).json(note);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for Update a Note
router.put('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Note.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: 'Note not found'});
        }
        return response.status(200).send({message: 'Note updated successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for Delete a Note
router.delete('/:id', async (request, response) => {
    try{
        const {id} = request.params;
        const result = await Note.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({message: 'Note not found'});
        }
        return response.status(200).send({message: 'Note deleted successfully'});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;