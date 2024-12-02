import UserModel from "../models/user.model.js";

const createUser= async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !email || !password){
        throw new Error("All fields are mandatory!");
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new Error("Email is already in use!");
    }

    const user= await UserModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password
    })

    return user;
}

export default createUser;