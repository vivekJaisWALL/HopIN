import React from "react";
import hopinLogo from "../assets/hopinLogo.jpg";
import homeImage from "../assets/homeImage.jpg"

const Home= () => {
    return (
        <div>
            <div className="h-screen w-full bg-bottom bg-cover pt-8 flex justify-between flex-col bg-red-400" style={{backgroundImage: `url(${homeImage})`}}>
                <img className="w-20 ml-8" src={hopinLogo} alt="logo"/>
                <div className="bg-white py-4 px-4 pb-7">
                    <h2 className="text-2xl font-bold text-center">Get Started with HopIN</h2>
                    <button className="w-full bg-black text-white py-3 rounded-md mt-5">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default Home;