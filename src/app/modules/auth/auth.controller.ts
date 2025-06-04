import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: result
        });
    }
);

const registerUser = catchAsync(
    async (req, res) => {
        const result = await authServices.registerUser(req.body);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully",
            data: result
        });
    }
);

const googleSignIn = catchAsync(
    async (req, res) => {
        const { name, email } = req.body;
        const result = await authServices.googleSignIn(name, email);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully",
            data: result
        });
    }
);

const getOTP = catchAsync(
    async (req, res) => {
        const { email } = req.body;
        const result = await authServices.getOTP(email);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "OTP sent successfully",
            data: result
        });
    }
);

const setForgotPassword = catchAsync(
    async (req, res) => {
        const { email, OTP, newPassword } = req.body;
        const result = await authServices.setForgotPassword(email, OTP, newPassword);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Password updated",
            data: result
        });
    }
);

export const authControllers = {
    loginUser,
    registerUser,
    getOTP,
    googleSignIn,
    setForgotPassword
};