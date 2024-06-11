import express from 'express';
import { Note } from '../models/noteModel.js';
import { NoteFile } from '../models/NoteFileModel.js';
import fileUpload from 'express-fileupload';
import { verifyJWT } from './loginRoute.js';

const router = express.Router();


//Route for Save a new Note
router.post('/', verifyJWT, fileUpload(), async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.subject ||
            !request.files
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, subject, files',
            })
        }

        let files = []
        let fileIDs = []

        for (const fileID in request.files) {
            let file = request.files[fileID]
            fileIDs.push(fileID)

            let newFile = {
                name: file.name,
                type: file.mimetype.split('/').at(-1),
            }
            files.push(newFile);
        }
        
        const newNote = {
            title: request.body.title,
            subject: request.body.subject,
            files: files,
            author: request.userId
        };

        const note = await Note.create(newNote);
        console.log(note.id)
        for (const [index, fileID] of fileIDs.entries()) {
            let file = note.files.at(index)
            request.files[fileID].mv(`./uploads/${file.id}.${file.type}`)
        }

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

        if(!note) {
            return response.status(404).json({message: 'Note not found'});
        }
        return response.status(200).json(note);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for Update a Note
router.put('/:id', verifyJWT, async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);

        if (note.author != request.userId) return response.status(403).json({message: 'This is not your note.'});

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
router.delete('/:id', verifyJWT, async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);

        if (note.author != request.userId) return response.status(403).json({message: 'This is not your note.'});

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