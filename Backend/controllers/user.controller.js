import UserModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser= async(req, res, next) => {
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName, email, password} = req.body;
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

    res.status(200).json({token, user});
}