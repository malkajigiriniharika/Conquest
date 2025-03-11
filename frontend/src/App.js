import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import GamePage from "./Pages/GamePage";
import MemoryCard from "./Pages/MemoryCard/MemoryCard.js";
import HangMan from "./Pages/HangMan/HangMan.js";
import WheelIndex from "./Pages/Wheel/WheelIndex.js";
import ExamIndex from "./Pages/Exam/ExamIndex.js";
import Matching from "./Pages/Matching/MatchingGame.js";


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // Update with your backend URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game/MemoryCard" element={<MemoryCard />} />
          <Route path="/game/SpinTheWheel" element={<WheelIndex />} />
          <Route path="/game/HangMan" element={<HangMan />} />
          <Route path="/game/Quiz" element={<ExamIndex />} />
          <Route path="/game/Matching" element={<Matching />} />
            
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
