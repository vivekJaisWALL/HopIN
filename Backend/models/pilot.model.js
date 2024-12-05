import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const pilotSchema= new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be atleast 3 characters long"]
        },
        lastName: {
            type: String,
            minlength: [3, "First name must be atleast 3 characters long"]
        },    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: [ "active" , "inactive" ],
        default: "inactive"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, "Color must be atleast 3 charcters long"]
        },
        numberPlate: {
            type: String,
            required: true,
            minlength: [ 3, "Color must be atleast 3 charcters long"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, "Capacity must atleast 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ "bike", "auto", "car"]
        }
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }
});

pilotSchema.methods.generateAuthToken= function(){
    const token= jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: "24h"});
    return token;
}

pilotSchema.methods.comparePassword= async (password) => {
    return await bcrypt.compare(password, this.password);
}

pilotSchema.statics.hashPassword= async (password) => {
    return await bcrypt.hash(password, 10);
}

const Pilot= mongoose.model("Pilot", pilotSchema);
export default Pilot;