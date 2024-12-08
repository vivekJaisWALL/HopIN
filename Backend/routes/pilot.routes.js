import express from "express";
const router= express.Router();
import { body } from "express-validator";
import { loginPilot, registerPilot } from "../controllers/pilot.controller.js";

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email!"),
    body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be atleast 3 characters!"),
    body("password").isLength({ min: 6 }).withMessage("Password must be 6 characters long"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color should be atleast 3 characters"),
    body("vehicle.numberPlate").isLength({ min: 3 }).withMessage("Vehicle number plate should be atleast 3 characters"),
    body("vehicle.capacity").isInt({ min: 1 }).withMessage("Vehicle capacity must be atleast 1"),
    body("vehicle.vehicleType").isIn(["bike", "auto", "car"]).withMessage("Invalid vehicle type!")
], registerPilot);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long!")
], loginPilot)

export default router;