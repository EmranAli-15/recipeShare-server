import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import config from "../config";

export const userRole = {
    admin: 'admin',
    user: 'user'
} as const;

type TUserRole = keyof typeof userRole;

const auth = (...requiredFields: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const accessToken = req.headers.cookie;
            const token = accessToken?.split("=")[1];

            if (!token) {
                throw new AppError(400, 'Please login first!');
            };

            jwt.verify(token, config.accessToken as string, (error, decoded) => {
                if (error) {
                    throw new AppError(401, 'Please login again!');
                };

                const { role } = decoded as JwtPayload;
                if (requiredFields && !requiredFields.includes(role)) {
                    throw new AppError(401, 'You are not authorized person !');
                };

                req.user = decoded as JwtPayload;

                next();
            })
        }
    )
};


export default auth;