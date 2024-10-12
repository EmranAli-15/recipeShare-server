export type TRecipe = {
    userId: string;
    title: string;
    image: string;
    like: number;
    totalComment: number;
    rating: number;
    recipe: string;
    comments: string[];
    isDeleted: boolean,
};