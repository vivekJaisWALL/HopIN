import DumpToken from "../models/dumpToken.model.js";
import Pilot from "../models/pilot.model.js";
import createPilot from "../services/pilot.service.js";
import { validationResult } from "express-validator";

export const registerPilot= async (req, res, next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const { fullName, email, password, vehicle } = req.body;

    const existingPilot= await Pilot.findOne({ email });
    if(existingPilot){
        res.status(400).json({ message: "Pilot already exists!"});
    }

    const hashedPassword= await Pilot.hashPassword(password);

    const pilot= await createPilot({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email, 
        password: hashedPassword,
        color: vehicle.color,
        numberPlate: vehicle.numberPlate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    })

    const token= pilot.generateAuthToken();

    res.status(201).json({ pilot, token });
}

export const loginPilot= async (req, res, next) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { email, password }= req.body;

    const pilot= await Pilot.findOne({email}).select("+password");
    if(!pilot){
        return res.status(401).json({ message: "Pilot does not exist, kindly register!" });
    }

    const isPasswordCorrect= await pilot.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(401).json({ message: "Incorrect email or password!" })
    }

    const token= pilot.generateAuthToken();
    res.cookie("token",token);
    res.status(200).json({ token, pilot });
}

export const getPilotProfile= async (req, res, next) => {
    return res.status(200).json({ pilot: req.pilot })
}

export const logoutPilot= async (req, res, next) => {
    const token= req.cookies.token || res.headers.authorization?.split(" ")[1];
    await DumpToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Pilot logged out successfully!" });
}