import { Types } from "mongoose";

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user';
    address: string;
    photo: string;
    experience: number;
    followers: number;
    following: Types.ObjectId[];
    bio: string;
    totalRecipes: number;
    isDeleted: boolean;
    OTP: string;
};