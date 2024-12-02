import dotenv from "dotenv"
dotenv.config();
import express from "express";
import cors from "cors";
const app= express();
import connectToDatabase from "./db/mongoose.config.js";
import userRoutes from "./routes/user.routes.js";

connectToDatabase()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Hello Doston!")
})

app.use("/users", userRoutes)

export {app};