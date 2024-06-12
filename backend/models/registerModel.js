import mongoose from "mongoose";

const registerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true
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
        oauthID: {
            type: String,
            require: false
        }
    },

    {
        timestamps: true,
    }

);

export const Register = mongoose.model('Register', registerSchema)