import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { validatePassword  } from '../shared/helper.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/envConfig.js';

export const signUp = async (req, res) =>{
    try{
        const { username,  email, password, confirmPassword, gender}  = req.body;
        if(!username || !email || !password || !gender){
            return res.status(400).send({"status" : "failed","message" : "fields are required."})
        }
        if(password !== confirmPassword){
            return res.status(400).send({"status" : "failed", "message" : "password and confirmPassword not matched."})
        }
        const isExistUser = await User.findOne({email});
        if(isExistUser){
            return res.status(400).send({"status" : "failed", "message" : "user already exist."})
        }
        const  isValidPassword = validatePassword(password);
        if(!isValidPassword){
            return res.status(400).send({"status" : "failed", "message" : "password should have at least one uppercase letter, at least one lowercase letter and minimum 6 characters are required"});
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
           return  res.status(201).send({ "status" : "success", "message" : "User created successfully.", data : {
               id : user._id,
               username : user.username,
               email : user.email,
               profilePic : user.profilePic,
               token : token
           }});
        }else{
            return res.status(400).send({"status" : "failed","message" : "User not created."})
        }

    }catch(err){
        console.log(err);
        return res.status(500).send({"status" : "failed", "message" : "internal server error."});

    }
}

export const signIn = async (req, res) =>{
            
}

export const signOut = async (req, res) =>{
            
}