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

const updateFollowing = catchAsync(
    async (req, res) => {
        const { id: whom, isFollow } = req.body;
        const { userId: myId } = req.user;

        const result = await userServices.updateFollowingIntoDB(myId, whom, isFollow);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Following status updated!',
            data: result
        });
    }
);

const myProfile = catchAsync(
    async (req, res) => {
        const { id } = req.params
        const result = await userServices.myProfile(id)

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "My profile data fetched successfully",
            data: result
        });
    }
);

export const userControllers = {
    updateAUser,
    updateFollowing,
    myProfile
};