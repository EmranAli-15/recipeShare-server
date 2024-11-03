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

const updateFollowingIntoDB = async (myId: string, anotherPersonId: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // This operation for updating the other person's followers array
        const anotherPerson = await User.findById(anotherPersonId);

        let updatedAnotherPersonFollowers: (string | mongoose.Types.ObjectId)[] = [];
        if (anotherPerson?.followers) {
            const isMyIdExist = anotherPerson.followers.find(id => id.toString() === myId);
            if (isMyIdExist) {
                updatedAnotherPersonFollowers = anotherPerson.followers.filter(id => id.toString() !== myId);
            } else {
                updatedAnotherPersonFollowers = [...anotherPerson.followers, myId];
            }
        } else {
            updatedAnotherPersonFollowers = [myId];
        }

        // Updating the other person's followers in the database with transaction
        await User.findByIdAndUpdate(
            anotherPersonId,
            { followers: updatedAnotherPersonFollowers },
            { session }
        );






        // This operation for updating my following array
        const me = await User.findById(myId);

        let updatedPersonsIAmFollowing: (string | mongoose.Types.ObjectId)[] = [];
        if (me?.following) {
            const isPersonIdExist = me.following.find(id => id.toString() === anotherPersonId);
            if (isPersonIdExist) {
                updatedPersonsIAmFollowing = me.following.filter(id => id.toString() !== anotherPersonId);
            } else {
                updatedPersonsIAmFollowing = [...me.following, anotherPersonId];
            }
        } else {
            updatedPersonsIAmFollowing = [anotherPersonId];
        }

        // Updating my following in the database with transaction
        await User.findByIdAndUpdate(
            myId,
            { following: updatedPersonsIAmFollowing },
            { session }
        );

        await session.commitTransaction();
        return "Updated following status"

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