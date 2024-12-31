import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import bcrypt from 'bcrypt';
import { TAuth, TAuthRegister } from "./auth.interface";
import { createAccessToken } from "../../utils/createAccessToken";
import nodemailer from "nodemailer";
import config from "../../config";


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
        userId: isUserExist?._id
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
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "mohammademranali15@gmail.com",
            pass: config.nodemailer_pass
        },
    });

    function sendMail(to: string, sub: string, msg: string) {
        transporter.sendMail({
            to: to,
            subject: sub,
            html: `<div><p>Do not share your OTP with others.</p><h1 style={{fontWeight: 'bold'}}>${msg}</h1></div>`
        })
    };

    const OTP = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

    sendMail(userEmail, "OTP for FOOD RECIPE", OTP.toString());

};

export const authServices = {
    loginUser,
    registerUser,
    getOTP
};