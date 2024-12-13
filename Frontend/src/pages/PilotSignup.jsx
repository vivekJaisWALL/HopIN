import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import hopinLogo from "../assets/hopin-logo2.jpg"

const PilotSignup= () => {
    const [ email, setEmail ]= useState("");
    const [ password, setPassword ]= useState("");
    const [ firstName, setFirstName ]= useState("");
    const [ lastName, setLastName ]= useState("");
    const [ pilotData, setPilotData ]= useState({});

    const handleFirstName= (e) => {
        setFirstName(e.target.value)
    }

    const handleLastName= (e) => {
        setLastName(e.target.value)
    }

    const handleEmailData= (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordData= (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        setPilotData({
            name: {
                firstName,
                lastName
            },
            email,
            password
        })
        setFirstName("")
        setLastName("")
        setEmail("");
        setPassword("");
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src={hopinLogo} alt="logo"/>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg font-medium mb-2">What's your name</h3>
                    <div className="flex gap-4 mb-6">
                        <input 
                            className="bg-[#eeeeee] rounded-md px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text" 
                            value={firstName}
                            onChange={handleFirstName}
                            placeholder="First name"
                            required 
                        />
                        <input 
                            className="bg-[#eeeeee] rounded-md px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                            type="text" 
                            value={lastName}
                            onChange={handleLastName}
                            placeholder="Last name"
                            required 
                        />
                    </div>

                    <h3 className="text-lg font-medium mb-2">What's your email</h3>
                    <input 
                        className="bg-[#eeeeee] mb-6 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="email" 
                        value={email}
                        onChange={handleEmailData}
                        placeholder="email@example.com"
                        required 
                    />

                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input 
                        className="bg-[#eeeeee] mb-6 rounded-md px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="password" 
                        value={password}
                        onChange={handlePasswordData}
                        placeholder="Password" 
                        required
                    />
                    <button className="bg-[#0e0e0e] mb-3 text-white font-semibold rounded-md px-4 py-2 w-full text-lg placeholder:text-base">Create account</button>
                </form>
                <p className="text-center">Already have an account? <Link to="/pilot-login" className="text-blue-600">Login here</Link></p>
            </div>

            <p className="text-[10px] leading-tight">This site is protected by reCAPTCHA and the <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
            </p>
        </div>
    )
}

export default PilotSignup;