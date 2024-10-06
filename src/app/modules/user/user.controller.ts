import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createAUser = catchAsync(
    async (req, res) => {
        const body = req.body;
        const result = await userServices.createUserIntoDB(body);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User registered successfully',
            data: result
        });
    }
);

export const userControllers = {
    createAUser,
};