import mongoose from "mongoose";

const additionalInfoSchema = new mongoose.Schema({
    age: {
        type: Number,
        require: true,
    },
    birthDate: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    bio: {
        type: String,
    }
})

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
        },
        addInfo: {
            type: additionalInfoSchema
        }
    },

    {
        timestamps: true,
    }

);


export const Register = mongoose.model('Register', registerSchema)
export const additionalInfo = mongoose.model('additionalInfo', additionalInfoSchema)