import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
    port: process.env.PORT,

    db_url: process.env.DB_URL,

    saltRounds: process.env.SALT_ROUNDS,

    userPassword: process.env.USER_PASSWORD,

    accessToken: process.env.ACCESS_TOKEN,

    nodemailer_pass: process.env.NODEMAILER_PASS,

    gemini_api_key: process.env.GEMINI_API_KEY
};