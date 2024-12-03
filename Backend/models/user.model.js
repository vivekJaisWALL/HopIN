import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "Last name must be atleast 3 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
})

//method to generate Authentication token for the user
userSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id : this._id}, process.env.JWT_SECRET, { expiresIn: "24h"});
    return token;
}

//method to compare password
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password, this.password);
}

//static method to hash the input password from the user
userSchema.statics.hashPassword= async function(password){
    return await bcrypt.hash(password, 10)
}

const UserModel= mongoose.model('User', userSchema);
export default UserModel;