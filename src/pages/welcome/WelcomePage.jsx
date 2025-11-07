// CSS Module Styles
import styles from "@/pages/welcome/WelcomePage.module.css";

// React Router Components
import { Link } from "react-router-dom";

import { SaveInfoContext } from "@/components/SaveInfo";
import { useContext, useState } from "react";

function WelcomePage() {
  const { user } = useContext(SaveInfoContext);
  const [logoutUser, setLogoutUser] = useState(SaveInfoContext);

  // Logout 
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setLogoutUser(null);
    // console.log(logoutUser, "User logged out");
  }

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcome}>
        <h1
          className={`${styles.welcomeMessage} animate__animated animate__tada`}>
          Hello <span className={styles.username}>{user?.username}!</span>
        </h1>
        <p
          className={`${styles.welcomeTitle} animate__animated animate__backInDown animate__slower`}>
          Welcome! It's Nice To See You Here
        </p>
        <div className="animate__animated animate__fadeInUp animate__delay-3s animate__slow">
          <button onClick={handleLogout} className={styles.welcomeButton}>
            <Link to="/" className={styles.welcomeLink}>
              Logout
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
