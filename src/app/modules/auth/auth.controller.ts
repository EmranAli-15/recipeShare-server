import catchAsync from "../../utils/catchAsync";
import { authServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await authServices.loginUser(req.body);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            token: result.accessToken,
            data: result.isUserExist
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
            token: result.accessToken,
            data: result.createUser
        });
    }
);


export const authControllers = {
    loginUser,
    registerUser
};