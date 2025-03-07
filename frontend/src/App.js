import React from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import GamePage from "./Pages/GamePage";
import MemoryCard from "./Pages/MemoryCard/MemoryCard.js";
import HangMan from "./Pages/HangMan/HangMan.js";
import {BrowserRouter as Router,  Routes, Route} from "react-router-dom";
import WheelIndex from "./Pages/Wheel/WheelIndex.js"
import ExamIndex from "./Pages/Exam/ExamIndex.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/MemoryCard" element={<MemoryCard/>}/>
        <Route path="/game/SpinTheWheel" element={<WheelIndex/>}/>
        <Route path="/game/HangMan" element={<HangMan/>}/>
        <Route path="/game/Quiz" element={<ExamIndex/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
