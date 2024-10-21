import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { validatePassword  } from '../shared/helper.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/envConfig.js';
import {errorHandler} from '../utils/error.js';


export const signUp = async (req, res, next) =>{
    try{
        const { username,  email, password, confirmPassword, gender}  = req.body;
        if(!username || !email || !password || !gender){
            return next(errorHandler(400,"All fields are required."));
        }
        if(password !== confirmPassword){
            return next(errorHandler(400,"Passwords not matched."));
        }
        const isExistUser = await User.findOne({email});
        if(isExistUser){
            return next(errorHandler(400,"User already exists."));
        }
        const  isValidPassword = validatePassword(password);
        if(!isValidPassword){
            return next(errorHandler(400,"There must be strong password."));
        }
        const hashedPassword = bcrypt.hashSync(password,10);

        const avatarMale = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const avatartFemale = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const otherAvatar = `https://avatar.iran.liara.run/username?username=${username}`;

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            gender,
            profilePic : gender == 'male' ? avatarMale : gender == 'female' ? avatartFemale : otherAvatar 
        })

        const user = await newUser.save();

        if(user){
            //generate jwt token
            const token = await jwt.sign({id : user._id }, jwtSecret);
            return  res.cookie("access_token",token, {httpOnly : true}).status(201).send({ "status" : "success", "message" : "User created successfully.", data : {
               id : user._id,
               username : user.username,
               email : user.email,
               profilePic : user.profilePic,
               token : token
           }});
        }else{
            return next(errorHandler(400,"User not created."));
        }
    }catch(err){
        console.log("Error : " + err);
        return next(errorHandler(500,"Internal Server Error."));
    }
}

export const signIn = async (req, res) =>{
            
}

export const signOut = async (req, res) =>{
            
}