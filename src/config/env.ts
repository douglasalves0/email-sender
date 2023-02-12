import dotenv from "dotenv";

dotenv.config();
const e: any = process.env;

export default {
    EMAIL: {
        USER: e.EMAIL_USER,
        PASSWORD: e.EMAIL_PASSWORD,
        SERVICE: e.EMAIL_SERVICE
    },
    APP: {
        PORT: e.APP_PORT,
        SECRET_KEY: e.APP_SECRET_KEY
    }
};