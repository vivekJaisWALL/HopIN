import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const authenticateUser= async(req, res, next) => {
    const token= req.cookies.token || req.headers.authorization.split(" ")[ 1 ];
    if(!token){
        return res.status(401).json({ message: "Unauthorized!"});
    }

    const isDumpedToken= await UserModel.findOne({token});
    if(isDumpedToken){
        return res.status(401).json({ message: "Unauthorized!"});
    }

    try {

        const decodedData= jwt.verify(token, process.env.JWT_SECRET);
        const user= await UserModel.findById(decodedData._id);

        req.user= user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized!"});
    }
}