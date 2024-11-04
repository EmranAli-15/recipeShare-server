import mongoose, { startSession } from "mongoose";
import { User } from "./user.model";

const updateUserIntoDB = async (payload: { body: any, id: string }) => {
    const result = await User.findByIdAndUpdate(
        payload.id,
        { $set: payload.body },
        { new: true, runValidators: true }
    );

    return result;
};

const updateFollowingIntoDB = async (myId: string, anotherPersonId: string, isFollow: boolean) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        if (isFollow) {
            await User.findByIdAndUpdate(
                anotherPersonId,
                { $pull: { followers: myId } },
                { session }
            );

            await User.findByIdAndUpdate(
                myId,
                { $pull: { following: anotherPersonId } },
                { session }
            );
        } else {
            await User.findByIdAndUpdate(
                anotherPersonId,
                { $addToSet: { followers: myId } },
                { session }
            );

            await User.findByIdAndUpdate(
                myId,
                { $addToSet: { following: anotherPersonId } },
                { session }
            );
        }

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
    } finally {
        session.endSession();
    }
};


export const userServices = {
    updateUserIntoDB,
    updateFollowingIntoDB
}