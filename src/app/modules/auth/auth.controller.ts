import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

// secure: process.env.NODE_ENV === "production",

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);
        const { accessToken, isUserExist } = result;

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: isUserExist
        });
    }
);

const registerUser = catchAsync(
    async (req, res) => {
        const result = await authServices.registerUser(req.body);
        const { accessToken, createUser } = result;

        res.cookie('token', accessToken, {
            httpOnly: true, // Prevents client-side JS from accessing the cookie
            secure: true,   // Ensures the cookie is sent only over HTTPS
            sameSite: 'none', // CSRF protection
            maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
        });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully",
            data: createUser
        });
    }
);


export const authControllers = {
    loginUser,
    registerUser
};