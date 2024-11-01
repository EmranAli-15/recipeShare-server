import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            required: true
        },
        address: {
            type: String,
            required: false
        },
        photo: {
            type: String,
            required: false
        },
        followers: {
            type: Number,
            required: false
        },
        following: {
            type: [Schema.Types.ObjectId],
            required: false,
            ref: 'User'
        },
        bio: {
            type: String,
            required: false
        },
        experience: {
            type: Number,
            required: false
        },
        totalRecipes: {
            type: Number,
            required: false
        },
        isDeleted: {
            type: Boolean,
            required: false
        },
        OTP: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.saltRounds));

    next();
});

userSchema.post('save', function (next) {
    const user = this;
    user.password = "";
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; // Remove the password field
    return user;
};

export const User = model<TUser>('User', userSchema);