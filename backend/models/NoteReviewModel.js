import mongoose from "mongoose";

const NoteReviewSchema = mongoose.Schema(
    {
        userID: {
            type: String,
            require: true,
        },
        noteID: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        rating: {
            type: Number,
            require: true,
        },
    },
    {
        timestamps: true,
    }

);

export const NoteReview = mongoose.model('NoteReview', NoteReviewSchema)