import express from "express";
const router= express.Router();
import { body } from "express-validator";
import { loginUser, registerUser, userProfile, logoutUser } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

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

router.get("/profile", authenticateUser, userProfile);

router.get("/logout", authenticateUser, logoutUser);

export default router;