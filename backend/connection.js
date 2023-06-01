import mongoose from "mongoose";
import 'dotenv/config';

const Connection = async () => {
    const userName = process.env.MONGO_USERNAME;
    const passWord = process.env.MONGO_PASSWORD;                 

    try{
        await mongoose.connect(`mongodb+srv://${userName}:${passWord}@cluster0.0ri67st.mongodb.net/`,{ useNewUrlParser: true});
        console.log("Database connected successfully!");
    }
    catch(error){
        console.log("Error: ", error.message);
    }
}

export default Connection;


