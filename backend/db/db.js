
import mongoose from "mongoose";

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{})
        console.log(`Connected to Database`);
        
    } catch (error) {
        console.log(`database Error ${error}`);
        process.exit(1)
    }
}

export default connectDb;  //exporting the function to use it in other files