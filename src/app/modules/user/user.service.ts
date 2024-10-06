import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    payload.password = payload?.password || config.userPassword as string
    const result = await User.create(payload);
    return result;
};

export const userServices = {
    createUserIntoDB,
}