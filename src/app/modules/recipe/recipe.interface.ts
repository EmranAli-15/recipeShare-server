import { Types } from "mongoose";
type Comment = {
    userId: Types.ObjectId;
    comment: string;
}

export type TRecipe = {
    user: Types.ObjectId;
    title: string;
    image: string;
    likes: [Types.ObjectId];
    totalComment: number;
    rating: number;
    recipe: string;
    category: string;
    comments: [
        {
            userId: Types.ObjectId;
            comment: string;
        }
    ];
    isDeleted: boolean;
};