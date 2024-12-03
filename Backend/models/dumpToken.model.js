import mongoose from "mongoose";

const dumpTokenSchema= new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expiresIn: 86400 //24hrs converted into seconds
    }
})

const DumpToken= mongoose.model("DumpToken", dumpTokenSchema);
export default DumpToken;