import { Types } from "mongoose";

export type TRecipe = {
    user: Types.ObjectId;
    title: string;
    image: string;
    like: number;
    totalComment: number;
    rating: number;
    recipe: string;
    category:string;
    comments: string[];
    isDeleted: boolean,
};