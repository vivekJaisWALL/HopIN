import express from "express";
const router= express.Router();
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller.js";

router.post("/register", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName").isString().withMessage("Invalid name"),
    body("fullName.firstName").isLength({min: 3}).withMessage("First name must be atleast 3 characters long"),
    body("password").isLength({min: 6}).withMessage("Password must be atleast 6 characters long")
] , registerUser)

router.post("/login", [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min: 6}).withMessage("Password must be atleast 6 characters long")
], loginUser)

export default router;