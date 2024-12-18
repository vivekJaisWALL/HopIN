import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import PilotLogin from "./pages/PilotLogin";
import PilotSignup from "./pages/PilotSignup";
import UserContext from "./contexts/UserContext";

const App= () => {
  const userData= useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>}/>
        <Route path="/signup" element={<UserSignup/>}/>
        <Route path="/pilot-login" element={<PilotLogin/>}/>
        <Route path="/pilot-signup" element={<PilotSignup/>}/>
      </Routes>
    </div>
  )
}

export default App;