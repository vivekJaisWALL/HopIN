import React from "react";
import hopinLogo from "../assets/hopinLogo.jpg";
import homeImage from "../assets/homeImage.jpg"
import { Link } from "react-router-dom";

const Home= () => {
    return (
        <div>
            <div className="h-screen w-full bg-bottom bg-cover pt-8 flex justify-between flex-col" style={{backgroundImage: `url(${homeImage})`}}>
                <img className="w-20 ml-8" src={hopinLogo} alt="logo"/>
                <div className="bg-white py-4 px-4 pb-7">
                    <h2 className="text-2xl font-bold text-center">Get Started with HopIN</h2>
                    <Link to="/login" className="w-full flex items-center justify-center bg-black text-white py-3 rounded-md mt-5">Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;