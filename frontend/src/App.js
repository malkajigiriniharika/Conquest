import React from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import GamePage from "./components/GamePage";
import {BrowserRouter as Router,  Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
