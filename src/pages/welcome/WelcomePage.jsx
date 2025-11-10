// Library
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
// context
import { SaveInfoContext } from "@/context/SaveInfo.jsx";
// Components
import { Link } from "react-router-dom";
import ChangeLang from "@/language/ChangeLang";
// CSS Module Styles
import styles from "@/pages/welcome/WelcomePage.module.css";

function WelcomePage() {
  // state and context
  const { user } = useContext(SaveInfoContext);
  const [logoutUser, setLogoutUser] = useState(SaveInfoContext);
  const { t } = useTranslation();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    window.location.reload("/");
    setLogoutUser(null);
  };

  return (
    <>
      <ChangeLang />
      <div className={styles.welcomeContainer}>
        <div className={styles.welcome}>
          <h1
            className={`${styles.welcomeMessage} animate__animated animate__tada`}
          >
            {t("welcome.hello", { name: user?.username || "" })}
          </h1>
          <p
            className={`${styles.welcomeTitle} animate__animated animate__backInDown animate__slower`}
          >
            {t("welcome.title")}
          </p>
          <div className={` ${styles.logoutLink} animate__animated animate__fadeInUp animate__delay-3s animate__slow`}>
            <Link onClick={handleLogout} to="/">
              {t("welcome.logout")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default WelcomePage;
