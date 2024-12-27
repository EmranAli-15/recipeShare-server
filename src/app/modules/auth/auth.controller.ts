import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

// secure: process.env.NODE_ENV === "production",

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);
        const { accessToken, isUserExist } = result;

        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Secure the cookie
            secure: true, // Only send cookies over HTTPS
            sameSite: 'none', // Required for cross-origin
            maxAge: 24 * 60 * 60 * 1000, // Optional: Set expiration (1 day in this case)
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

        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Secure the cookie
            secure: true, // Only send cookies over HTTPS
            sameSite: 'none', // Required for cross-origin
            maxAge: 24 * 60 * 60 * 1000, // Optional: Set expiration (1 day in this case)
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
    registerUser,
};