import Pilot from "../models/pilot.model.js";

const createPilot= async ({
    firstName, lastName, email, password, color, numberPlate, capacity, vehicleType
}) => {
    if( !firstName || !email || !password || !color || !numberPlate || !capacity || !vehicleType){
        throw new Error("All fields are mandatory!");   
    }

    const pilot= await Pilot.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        vehicle: {
            color,
            numberPlate,
            capacity,
            vehicleType
        }
    });

    return pilot;
}

export default createPilot;