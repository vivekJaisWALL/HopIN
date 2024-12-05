import UserModel from "../models/user.model.js";

const createUser= async ({
    firstName, lastName, email, password
}) => {
    if(!firstName || !email || !password){
        throw new Error("All fields are mandatory!");
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