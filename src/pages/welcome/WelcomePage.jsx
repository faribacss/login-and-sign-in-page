import "./WelcomePage.css"
import { Link } from "react-router-dom";

function WelcomePage() {
    return(
        <div className="welcome-container">
            <div className="welcome">
                <h1 className="welcome-message animate__animated animate__tada">Hello</h1>
                <p className="welcome-title animate__animated animate__shakeX">Welcome! It's Nice To See You Here</p>
                <button className="welcome-button animate__animated animate__fadeInUp animate__delay-2s">
                    <Link to="/" className="welcome-link">Go to Login</Link>
                </button>
            </div>
        </div>
    )
}

export default WelcomePage;