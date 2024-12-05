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