import mongoose, { Connection } from 'mongoose';

let isConnected : Connection|boolean = false;

const connectDB = async () => {
    if(isConnected) {
        console.log("mongodb allready connected");
        return isConnected;
    }

    try {
        const res = await mongoose.connect(process.env.MONGO_URI!)
        isConnected = res.connection;
        console.log("MongoDB is Connnected!");
        return isConnected;
    } catch (error) {
        console.log("mongoDB Error", error);
    }
};

export default connectDB;