import React, { useState } from "react";
import hopinLogo from "../assets/hopin-logo2.jpg";
import { Link } from "react-router-dom";

const PilotLogin= () => {
    const [ email, setEmail ]= useState("");
    const [ password, setPassword ]= useState("");
    const [ pilotData, setPilotData ]= useState({});

    const handleEmailData= (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordData= (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setPilotData({
            email,
            password
        })
        
        setEmail("");
        setPassword("");
    }

    return(
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src={hopinLogo} alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input 
                        className="bg-[#eeeeee] mb-7 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email" 
                        value={email}
                        onChange={handleEmailData}
                        placeholder="email@example.com"
                        required 
                    />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input 
                        className="bg-[#eeeeee] mb-7 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password" 
                        value={password}
                        onChange={handlePasswordData}
                        placeholder="Password" 
                        required
                    />
                    <button className="bg-[#0e0e0e] mb-3 text-white font-semibold rounded-md px-4 py-2 w-full text-lg placeholder:text-base">Login</button>
                </form>
                <p className="text-center">Join the fleet? <Link to="/pilot-signup" className="text-blue-600">Register as a Pilot</Link></p>
            </div>

            <div>
                <Link 
                    className="bg-[#004cff] flex items-center justify-center mb-3 text-white font-semibold rounded-md px-4 py-2 w-full text-lg placeholder:text-base"
                    to="/login"
                    >
                        Sign in as User
                </Link>
            </div>
        </div>
    )
}

export default PilotLogin;