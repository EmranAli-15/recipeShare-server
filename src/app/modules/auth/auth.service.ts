import { TAuth, TAuthRegister } from "./auth.interface";
import { createAccessToken } from "../../utils/createAccessToken";
import { User } from "../user/user.model";
import config from "../../config";
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
import AppError from "../../errors/AppError";


const loginUser = async (payload: TAuth) => {
    const isUserExist = await User.findOne({
        email: payload?.email
    });

    if (!isUserExist) {
        throw new AppError(400, 'Could not find any user!');
    };

    // make the password in plaintext and check the password is matched or not
    const isPasswordMatched = await bcrypt.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new AppError(403, 'Email or password not matched!');
    };


    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        userId: isUserExist?._id,
        name: isUserExist.name,
        photo: isUserExist.photo
    };

    const accessToken = createAccessToken(jwtPayload);

    return {
        accessToken,
        isUserExist
    };
};

const registerUser = async (payload: TAuthRegister) => {
    const isUserExist = await User.findOne({
        email: payload?.email
    });

    if (isUserExist) {
        throw new AppError(400, 'The email is already registered!');
    };

    const role = "user";
    const data = { ...payload, role };

    const createUser = await User.create(data);

    const jwtPayload = {
        email: createUser.email,
        role: createUser.role,
        userId: createUser._id
    };

    const accessToken = createAccessToken(jwtPayload);

    return {
        accessToken,
        createUser
    };
};

const getOTP = async (userEmail: string) => {
    const user = await User.findOne({
        email: userEmail
    });

    if (user) {
        const OTP = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        await User.findByIdAndUpdate(
            user._id,
            {
                OTP: OTP.toString()
            }
        );

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "mohammademranali15@gmail.com",
                pass: config.nodemailer_pass
            },
        });

        async function sendMail(to: string, sub: string, msg: string) {
            await new Promise((resolve, reject) => {
                transporter.sendMail({
                    to: to,
                    subject: sub,
                    html: `<div><p>Do not share your OTP with others.</p><h1 style={{fontWeight: 'bold'}}>${msg}</h1></div>`
                }, (err, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(info);
                    }
                })
            })
        };

        sendMail(userEmail, "OTP for FOOD RECIPE", OTP.toString());
    } else {
        throw new AppError(403, "User not exit.");
    }
};

const setForgotPassword = async (userEmail: string, OTP: string, newPass: string) => {
    const user = await User.findOne({ email: userEmail });
    if (OTP && user?.OTP == OTP) {
        const newHash = bcrypt.hashSync(newPass, Number(config.saltRounds));
        await User.findByIdAndUpdate(
            user._id,
            {
                password: newHash
            }
        );
        await User.findByIdAndUpdate(
            user.id,
            {
                OTP: null
            }
        )
    } else {
        throw new AppError(403, "Incorrect OTP");
    }
    return;
}

const googleSignIn = async (name: string, email: string) => {
    const isUserExist = await User.findOne({ email: email });

    if (!isUserExist) {
        const data = {
            name,
            email,
            role: "user",
            password: config.userPassword
        }
        const createUser = await User.create(data);
        const jwtPayload = {
            email: createUser.email,
            role: createUser.role,
            userId: createUser?._id,
            name: createUser.name,
            photo: createUser?.photo
        };

        const accessToken = createAccessToken(jwtPayload);

        return {
            accessToken,
            createUser
        };
    }
    else {
        const jwtPayload = {
            email: isUserExist.email,
            role: isUserExist.role,
            userId: isUserExist?._id,
            name: isUserExist.name,
            photo: isUserExist?.photo
        };

        const accessToken = createAccessToken(jwtPayload);

        return {
            accessToken,
            isUserExist
        };
    }
}

export const authServices = {
    loginUser,
    registerUser,
    getOTP,
    googleSignIn,
    setForgotPassword
};