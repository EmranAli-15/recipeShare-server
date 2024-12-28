import jwt from 'jsonwebtoken';
import config from '../config';

export const createAccessToken = (jwtPayload: any) => {
    return jwt.sign(
        jwtPayload,
        config.accessToken as string,
        {
            expiresIn: "1 days"
        }
    )
};