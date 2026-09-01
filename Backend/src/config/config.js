import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
    throw new Error('PORT is not defined');
}

if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
}

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

if (!process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT_EXPIRES_IN is not defined');
}


export const config = {
    PORT: process.env.PORT || 8000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
};