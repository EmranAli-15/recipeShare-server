import { User } from "./user.model";

const updateUserIntoDB = async (payload: { body: any, id: string }) => {
    const result = await User.findByIdAndUpdate(
        payload.id,
        { $set: payload.body },
        { new: true, runValidators: true }
    );

    return result;
}

export const userServices = {
    updateUserIntoDB
}