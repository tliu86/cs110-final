import mongoose from "mongoose";

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
        publishYear: {
            type: String,
            require: true,
        },
    },

    {
        timestamps: true,
    }

);

export const Note = mongoose.model('Note', noteSchema)