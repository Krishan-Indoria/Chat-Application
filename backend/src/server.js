import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import dbConnection from './config/dbConfig.js';
const uri = process.env.REMOTE_DB_URL + process.env.REMOTE_DB; 
dbConnection(uri);

app.use(express.json());
app.get('/', (req,res) =>{
    res.send("<h1>Hello World!</h1>");
})

// import routes

import authRoute from './routers/auth.route.js';
app.use('/api/auth', authRoute);

app.listen(PORT, ()=>{
    console.log("Server is running on port : " + PORT);
})