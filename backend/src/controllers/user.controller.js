import User from "../models/user.model.js";



export const getAllUsers = async (req,res, next) => {
        try {
                const users = await User.find({}).select("-password");
                res.status(200).send({"status" : "success", "message" : "users found successfully.", "data"  : users})
        } catch (err) {
            console.log("Error: " + err);
            next(err);
        }
}