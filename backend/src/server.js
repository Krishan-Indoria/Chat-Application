import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import dbConnection from './config/dbConfig.js';
const uri = process.env.REMOTE_DB_URL + process.env.REMOTE_DB; 
dbConnection(uri);

app.get('/', (req,res) =>{
    res.send("<h1>Hello World!</h1>");
})


app.listen(PORT, ()=>{
    console.log("Server is running on port : " + PORT);
})