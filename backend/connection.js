import mongoose from "mongoose";


// COnnetion to database
const Connection = async () => {
                        
    try{
        await mongoose.connect('mongodb+srv://Sachin7777:$achiN7221@cluster0.0ri67st.mongodb.net/',{ useNewUrlParser: true});
        console.log("Database connected successfully!");
    }
    catch(error){
        console.log("Error: ", error.message);
    }
}

export default Connection;


