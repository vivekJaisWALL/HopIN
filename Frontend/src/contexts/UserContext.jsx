import React, { useContext } from "react";

export const UserDataContext= useContext();

const UserContext = ({ children }) => {
    return (
        <div>
            <UserDataContext.Provider>
                { children }
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;