import React, { useContext } from 'react';
import DataContext from '../context/dataContext';

const Start = () => {
    const { startQuiz, showStart, leaderBoard } = useContext(DataContext);
    return (
        <section className='text-white text-center bg-dark' style={{ display: `${showStart ? 'block' : 'none'}` }}>
            <div className="container bg-dark">
                <div className="row vh-100 align-items-center justify-content-center">
                    <div className="col-lg-8">
                        <h1 id="h1Id" className='fw-bold mb-4'>Constitution Quiz</h1>
                        <button onClick={startQuiz} className="btn px-4 py-2 bg-light text-dark fw-bold">Start Quiz</button>
                    </div>
                    <div className="leaderboard-flex">
                        <div className="leaderboard-container">
                            <div className="leaderboard-header">
                                <h1>Leaderboard</h1>
                                <p>Indian Constitution Game</p>
                            </div>
                            <div className="leaderboard">
                                {leaderBoard.map((player, index) => (
                                    <div key={player.id} className={`player ${index === 0 ? "top-1" : index === 1 ? "top-2" : index === 2 ? "top-3" : " "}`}>
                                        <span className="rank">
                                            {index === 0 ? "🥇 1st" : index === 1 ? "🥈 2nd" : index === 2 ? "🥉 3rd" : `${index + 1}th`}
                                        </span>
                                        <span className="name">{player.name}</span>
                                        <span className="score">{player.score}</span>
                                        <span className="time">{player.time} secs</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Start;