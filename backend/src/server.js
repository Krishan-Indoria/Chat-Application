import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
import dbConnection from './config/dbConfig.js';
import cookieParser from 'cookie-parser'

dbConnection();

app.use(express.json());
app.use(cookieParser())
app.get('/', (req,res) =>{
    res.send("<h1>Hello World!</h1>");
})

// import routes

import authRoute from './routers/auth.route.js';
import messageRoute from './routers/message.route.js';
import userRoute from './routers/user.route.js';

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute)
app.use('/api/users', userRoute)


app.listen(PORT, ()=>{
    console.log("Server is running on port : " + PORT);
})

// error handler

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error."

    return res.status(statusCode).send({"status" : "failed", statusCode,  message });
})