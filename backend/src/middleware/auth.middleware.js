import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../config/envConfig.js";



export const checkAuth  = async (req,res,next) => {
    try{
            const token = req.cookies.access_token || req.header.authorization.split(' ')[1];
            if(!token){
                return next(errorHandler(401,"Unauthorized"));
            }
            jwt.verify(token,jwtSecret,(err,payload) => {
                if(err){
                    return next(errorHandler(403,"Forbidden"));
                }

                req.user = payload;
                next();
            })
    }catch(err){
        console.log("Error: "+err);
        return next(err);
    }
}

