// CSS Module Styles
import styles from "@/pages/welcome/WelcomePage.module.css";

// React Router Components
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcome}>
        <h1
          className={`${styles.welcomeMessage} animate__animated animate__tada animate__slower`}>
          Hello
        </h1>
        <p
          className={`${styles.welcomeTitle} animate__animated animate__shakeX animate__delay-1s`}>
          Welcome! It's Nice To See You Here
        </p>
        <div className="animate__animated animate__fadeInUp animate__delay-2s animate__slow">
          <button className={styles.welcomeButton}>
            <Link to="/" className={styles.welcomeLink}>
              Back to Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
