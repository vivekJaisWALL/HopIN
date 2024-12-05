import DumpToken from "../models/dumpToken.model.js";
import UserModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser= async(req, res, next) => {
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName, email, password} = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword= await UserModel.hashPassword(password);

    const user= await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword
    })

    const token= user.generateAuthToken();

    res.status(201).json({ user, token});
}

export const loginUser= async(req, res, next) => {
    const errors= validationResult(req);

    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password}= req.body;

    const user= await UserModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: "Incorrect email or password!"});
    }

    const isPasswordCorrect= await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(401).json({message: "Incorrect email or Password!"});
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({token, user});
}

export const userProfile= async(req, res, next) => {
    return res.status(200).json(req.user)
}

export const logoutUser= async(req, res, next) => {
    res.clearCookie("token");
    const token= req.cookies.token || req.headers.authorization?.split(" ")[ 1 ];
    
    await DumpToken.create({ token });

    res.status(200).json({ message: "Logged out successfully!"});
}