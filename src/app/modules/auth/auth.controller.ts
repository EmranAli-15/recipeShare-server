import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);
        const { accessToken, isUserExist } = result;

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: {isUserExist, accessToken}
        });
    }
);

const registerUser = catchAsync(
    async (req, res) => {
        const result = await authServices.registerUser(req.body);
        const { accessToken, createUser } = result;

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User created successfully",
            data: {createUser, accessToken}
        });
    }
);

export const authControllers = {
    loginUser,
    registerUser,
};