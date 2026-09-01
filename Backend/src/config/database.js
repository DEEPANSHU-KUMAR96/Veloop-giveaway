import mongoose from "mongoose";
import { config } from "./config.js";

export default async function connecToDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}