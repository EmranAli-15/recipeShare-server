import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import { strict } from "assert";


const updateAUser = catchAsync(
    async (req, res) => {
        const body = req.body;
        const { id } = req.params;

        const result = await userServices.updateUserIntoDB({ body, id });

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User data updated successfully',
            data: result
        });
    }
);

export const userControllers = {
    updateAUser
};