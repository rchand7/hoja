import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGO_URI); // Add this log
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
};

export default connectDB;
