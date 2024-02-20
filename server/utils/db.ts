import mongoose from "mongoose";
require('dotenv').config();

const dbURL:string = process.env.DB_URI || '';

const connectDB = async() => {
    try {
        const data = await mongoose.connect(dbURL)

        console.log(`Database connected with ${data.connection.host}`)
    
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB,5000)
    }
}

export default connectDB;