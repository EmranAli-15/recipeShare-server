export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user';
    address: string;
    photo: string;
    experience: number;
    bio: string;
    totalRecipes: number;
    following: [];
    followers: number;
    isDeleted: boolean;
    OTP: string;
};