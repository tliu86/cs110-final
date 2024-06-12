import express from 'express';
import { Note } from '../models/noteModel.js';
import { NoteFile } from '../models/NoteFileModel.js';
import fileUpload from 'express-fileupload';
import { verifyJWT } from './loginRoute.js';
import { Register } from '../models/registerModel.js';
import { NoteReview } from '../models/NoteReviewModel.js';

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
        const notes = await Note.find({}).lean();

        for (const i in notes) {
            let note = notes[i];
            let id = note.author;
            let author = await Register.findById(id);
            if (author?.username){
                // console.log(author.username)
                notes[i].authorName = author.username;
            }
        }

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

        const author = await Register.findById(note.author);
        note._doc.authorName = author.username;

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

// Route to review and rate a note
router.post('/:id/review', verifyJWT, async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);
        const userId = request.userId;

        if(!note) {
            return response.status(404).json({message: 'Note not found'});
        }

        const rating = request.body.rating;
        // console.log(request.body)
        if(rating == null) {
            return response.status(400).json({message: 'Missing required field: rating.'});
        } else if (rating < 1 || rating > 5) {
            return response.status(400).json({message: 'Rating must be between 1 and 5.'});
        }

        const review = await NoteReview.findOne({noteID: id, userID: userId});

        const content = request.body.content;
        var newReview = {
            userID: userId,
            noteID: id,
            content: content || '',
            rating: rating
        }

        if(review) {
            const updatedReview = await NoteReview.findByIdAndUpdate(review.id, {            
                content: content || '',
                rating: rating
            })
            return response.status(200).json(updatedReview);
        }


        const createdReview = await NoteReview.create(newReview);
        return response.status(200).json(newReview);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route to review and rate a note
router.delete('/:id/review', verifyJWT, async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);
        const userId = request.userId;

        if(!note) {
            return response.status(404).json({message: 'Note not found'});
        }

        const review = await NoteReview.findOneAndDelete({noteID: id, userID: userId});

        return response.status(200).json({});
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route to get reviews and ratings for a note
router.get('/:id/reviews', verifyJWT, async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);
        const userId = request.userId;

        if(!note) {
            return response.status(404).json({message: 'Note not found'});
        }

        var reviews = await NoteReview.find({noteID: id}).lean();
        // console.log(reviews)

        var ratingSum = 0

        for (let [i, review] of reviews.entries()) {
            // let review = reviews[i]
            console.log(review)
            if (review.rating) {
                ratingSum += review.rating;
            }

            let user = await Register.findById(review.userID).lean()
            // console.log(user)
            if (user?.username) {
                // console.log(user.username)
                reviews[i].userName = user.username
            }
        }

        var averageRating = Math.round(ratingSum / reviews.length * 100) / 100 || 0

        await Note.findByIdAndUpdate(id, {averageRating});
        
        return response.status(200).json({
            reviews: reviews,
            averageRating: ratingSum / reviews.length
        });

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

// Route to get similar notes
router.get('/:id/similar', async (request, response) => {
    try{
        const {id} = request.params;
        const note = await Note.findById(id);

        if(!note) {
            return response.status(404).json({message: 'Note not found'});
        }

        const subject = note.subject;
        const notes = await Note.find({subject}).lean();

        for (const i in notes) {
            let note = notes[i];
            let id = note.author;
            let author = await Register.findById(id);
            if (author?.username){
                // console.log(author.username)
                notes[i].authorName = author.username;
            }
        }

        // const author = await Register.findById(note.author);

        return response.status(200).json(notes);
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})


router.get('/', async (request, response) => {
    try{
        const notes = await Note.find({}).lean();

        for (const i in notes) {
            let note = notes[i];
            let id = note.author;
            let author = await Register.findById(id);
            if (author?.username){
                // console.log(author.username)
                notes[i].authorName = author.username;
            }
        }

        return response.status(200).json({
            count: notes.length,
            data: notes
        });
    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;