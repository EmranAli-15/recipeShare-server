import { User } from "./user.model";

const updateUserIntoDB = async (payload: { body: any, id: string }) => {
    const result = await User.findByIdAndUpdate(
        payload.id,
        { $set: payload.body },
        { new: true, runValidators: true }
    );

    return result;
};

const updateFollowingIntoDB = async (who: string, whom: string) => {
    const userFollowers = await User.findById(whom);
    let updatedFollowersNumber
    if (userFollowers?.followers) {
        updatedFollowersNumber = userFollowers.followers + 1;
    } else {
        updatedFollowersNumber = 1;
    }
    await User.findByIdAndUpdate(whom, { $set: { followers: updatedFollowersNumber } });


    const iAmFollowing = await User.findById(who);
    let updatedPeoplesIAmFollowing = [];
    if (iAmFollowing?.following) {
        updatedPeoplesIAmFollowing = [...iAmFollowing.following, whom];
    } else {
        updatedPeoplesIAmFollowing = [whom];
    }
    await User.findByIdAndUpdate(who, { $set: { following: updatedPeoplesIAmFollowing } });

    return "Updating successful for following and followers";
}

export const userServices = {
    updateUserIntoDB,
    updateFollowingIntoDB
}