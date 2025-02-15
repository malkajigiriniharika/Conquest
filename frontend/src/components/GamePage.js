import "../styles/GamePageStyle.css";
import HangMan from "../styles/Images/HangMan.jpg";
import Matching from "../styles/Images/Matching.jpg";
import SpinTheWheel from "../styles/Images/SpinTheWheel.jpg";
import MemoryCard from "../styles/Images/MemoryCard.jpg";
import React from "react";

const games = [
    { name: "Hangman", imgName: HangMan },
    { name: "Memory Cards", imgName: MemoryCard },
    { name: "Matching", imgName: Matching },
    { name: "Spin Me", imgName: SpinTheWheel }
];

const GamePage = () => {
    return (
        <div className="game-container">
            {/* Sidebar */}
            <div className="sidebar">
                <h3>Genres</h3>
                <a href="#">Preamble</a>
                <a href="#">Directive Principles</a>
                <a href="#">Children Rights</a>
                <a href="#">Women Rights</a>
                <a href="#">Environment</a>
                <a href="#">Fundamental Rights</a>
                <a href="#">Fundamental Duties</a>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Search Bar */}
                <input type="text" className="search-bar" placeholder="Search Games" />

                {/* Banner */}
                <div className="banner">
                    <img src="/assets/banner.jpg" alt="Featured Game" />
                </div>

                {/* Trending Games */}
                <div className="section">
                    <h2>Trending Games</h2>
                    <div className="game-grid">
                        {games.map((game, index) => (
                            <div key={index} className="game-card">
                                <img src={game.imgName} alt={game.name} />
                                <p>{game.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
