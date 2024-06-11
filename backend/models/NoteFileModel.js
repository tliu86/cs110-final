import mongoose from "mongoose";

const NoteFileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }

);

const NoteFile = mongoose.model('NoteFile', NoteFileSchema)

export {NoteFile, NoteFileSchema}