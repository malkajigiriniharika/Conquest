import "../styles/GamePageStyle.css";
import HangMan from "../styles/Images/HangMan.jpg";
import Matching from "../styles/Images/Matching.jpg";
import SpinTheWheel from "../styles/Images/SpinTheWheel.jpg";
import MemoryCard from "../styles/Images/MemoryCard.jpg";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const games = [
    { name: "Spin Me", imgName: SpinTheWheel, cardName: "SpinTheWheel" },
    { name: "Memory Cards", imgName: MemoryCard, cardName: "MemoryCard" },
    { name: "Hangman", imgName: HangMan, cardName: "HangMan" },
    { name: "Matching", imgName: Matching, cardName: "Matching" },
    
];

const genreVideos = {
    "Preamble": "/video/Preamble.mp4",
    "Directive Principles": "/video/directive_principles.mp4",
    "Children Rights": "/video/children_rights.mp4",
    "Women Rights": "/video/women_rights.mp4",
    "Environment": "/video/environmental_rights.mp4",
    "Fundamental Rights": "/video/fundamental-rights.mp4",
    "Fundamental Duties": "/video/fundamental_duties.mp4",
};

const GamePage = () => {
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoChange = (videoUrl) => {
        setSelectedVideo(null);
        setTimeout(() => {
            setSelectedVideo(videoUrl);
        }, 50);
    };

    return (
        <div className="gamepageBody">
            <div className="game-container">
                {/* Sidebar */}
                <div className="sidebar">
                    <h3>Genres</h3>
                    {Object.keys(genreVideos).map((genre, index) => (
                        <a key={index} href="#" onClick={(e) => {
                            e.preventDefault();
                            handleVideoChange(genreVideos[genre]);
                        }}>
                            {genre}
                        </a>
                    ))}
                    <a onClick={() => navigate("/game/Quiz")}><h3>Quiz</h3></a>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Search Bar */}
                    <input type="text" className="search-bar" placeholder="Search Games" />

                    {/* Banner */}
                    <div className="banner">
                        <img src="/assets/banner.jpg" alt="Featured Game" />
                    </div>

                    {/* Video Player */}
                    {selectedVideo && (
                        <div className="video-container">
                            <video key={selectedVideo} controls autoPlay>
                                <source src={selectedVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                    {/* Trending Games */}
                    <div className="section">
                        <h2>Trending Games</h2>
                        <div className="game-grid">
                            {games.map((game, index) => (
                                <div key={index} onClick={() => navigate("/game/" + game.cardName)} className="game-card">
                                    {game.link ? (
                                        <a href={game.link} target="_blank" rel="noopener noreferrer">
                                            <img src={game.imgName} alt={game.name} />
                                            <p>{game.name}</p>
                                        </a>
                                    ) : (
                                        <>
                                            <img src={game.imgName} alt={game.name} />
                                            <p>{game.name}</p>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;
