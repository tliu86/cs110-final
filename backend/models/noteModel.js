import mongoose from "mongoose";
import { NoteFileSchema } from '../models/NoteFileModel.js';

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        author: {
            type: String,
            require: true,
        },
        subject: {
            type: String,
            require: true,
        },
        files: [NoteFileSchema],
        averageRating: {
            type: Number,
            require: true
        }
    },

    {
        timestamps: true,
    }

);

export const Note = mongoose.model('Note', noteSchema)