import mongoose from "mongoose";
import { User } from "./user.model";
import bcrypt from "bcrypt";
import config from "../../config";
import AppError from "../../errors/AppError";

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

const myProfile = async (id: string) => {
    const result = await User.findById(id).populate("following", "name photo followers");

    return result;
};

const anyUserProfileFromDB = async (id: string) => {
    const result = await User.findById(id);

    return result;
};

const updateUserPasswordIntoDB = async (userId: string, currentPass: string, newPass: string) => {
    const result = await User.findById(userId);

    if (result) {
        const checked = await bcrypt.compare(currentPass, result.password);
        if (!checked) throw new AppError(403, "password not matched.");

        const newHash = bcrypt.hashSync(newPass, Number(config.saltRounds));
        await User.findByIdAndUpdate(
            userId,
            {
                password: newHash
            }
        );
        return;
    };
}

export const userServices = {
    updateUserIntoDB,
    updateFollowingIntoDB,
    myProfile,
    anyUserProfileFromDB,
    updateUserPasswordIntoDB
}