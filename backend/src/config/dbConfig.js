import mongoose from "mongoose";
import { db_uri } from "./envConfig.js";
const dbConnection = async () => {
    try{
      await mongoose.connect(db_uri);
      console.log('MongoDB Connected...');
    }catch(err){
      console.error(err.message); 
      process.exit(1);
    }
  }
  
 export default  dbConnection;