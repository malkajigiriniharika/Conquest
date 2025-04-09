import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyle.css"
export default function Dashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <div className="dashboardContainer">
            <nav>
                <div className="logo">
                    <img src="gamepad-icon.png" alt="Logo" />
                </div>
                <ul className="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Recommended Games</a></li>
                </ul>
                <button onClick={logout}>Sign Out</button>
            </nav>

            <header>
                <div className="content">
                    <h1>ConQuest: Indian Edition</h1>
                    <p>(Let's Learn Constitution in a simpler manner)</p>
                    <p>A platform designed to enhance constitutional literacy using gamification.</p>
                    <div className="buttons">
                        <button className="btn-primary" onClick={() => navigate("/game")}>Get Started</button>
                        <a href="#" className="btn-secondary">Learn more</a>
                    </div>
                </div>
            </header>
        </div>
    );
}