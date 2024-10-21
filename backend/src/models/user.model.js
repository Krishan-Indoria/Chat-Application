import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username : {
        type  : String,
        required : true,
        unique : true,
        trim: true
    },
    email : {
        type  : String,
        required : true,
        unique : true,
        trim: true,
        lowercase : true
    },
    password : {
        type  : String,
        required : true,
        minlength : 6,
    },
    gender : {
        type : String,
        required : true,
        enum : ["male", "female", "other"]
    },
    profilePic: { 
        type : String,
        default : ""
    },
    
},{timestamps : true})

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialized
  userSchema.set('toJSON', {
    virtuals: true,
  });
  userSchema.set('toObject', {
    virtuals: true,
  });

// Middleware to update the updatedAt field before saving
  userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });
  
const User = mongoose.model("User", userSchema);

export default User;