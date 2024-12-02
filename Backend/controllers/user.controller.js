import UserModel from "../models/user.model.js";
import createUser from "../services/user.service.js";
import { validationResult } from "express-validator";
// import { hashPassword, generateAuthToken } from "../models/user.model.js";

export const registerUser= async(req, res, next) => {
    const errors= validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    console.log(req.body);
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