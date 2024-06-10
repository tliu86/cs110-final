import mongoose from "mongoose";

const registerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },

    {
        timestamps: true,
    }

);

export const Register = mongoose.model('Register', registerSchema)