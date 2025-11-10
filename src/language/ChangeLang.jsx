// Library
import { Box, ClickAwayListener } from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// Style
import style from "@/language/ChangeLang.module.css";
// images
import EnglishFlag from "@/assets/public/img/English.png";
import IranFlag from "@/assets/public/img/Farsi.png";
import KoreaFlag from "@/assets/public/img/korea.png";
// icon
import PublicIcon from "@mui/icons-material/Public";

function ChangeLang() {
  // states
  const [open, setOpen] = useState(false);
  const [persianLang, setPersianLang] = useState();
  const { i18n } = useTranslation();
  useEffect(() => {
    // fall back to localStorage
    const lang = i18n?.language || localStorage.getItem("lang") || "en";
    document.documentElement.lang = lang;
    if (lang?.startsWith("fa")) {
      document.documentElement.dir = "rtl";
      setPersianLang(true);
    } else {
      document.documentElement.dir = "ltr";
      setPersianLang(false);
    }
  }, []);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //   persian change
  const loadPersianFonts = () => {
    try {
      document.fonts.load("1rem 'Yekan'");
      document.fonts.load("1rem 'Lalezar'");
    } catch (e) {
      // ignore
    }
  };

  // change app language in a single place
  const changeAppLanguage = (lang) => {
    const isFa = String(lang).startsWith("fa");
    document.documentElement.lang = lang;
    document.documentElement.dir = isFa ? "rtl" : "ltr";
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
    if (isFa) loadPersianFonts();
    setPersianLang(isFa);
    setOpen(false);
  };

  const persianLangClick = () => changeAppLanguage("fa");
  const englishLangClick = () => changeAppLanguage("en");
  const koreanLangClick = () => changeAppLanguage("ko");

  return (
    <ClickAwayListener
      onClickAway={handleClickAway}
      className={style.changeLang}
    >
      <Box className={style.langBox}>
        <button
          type="button"
          onClick={handleClick}
          className={style.langButton}
        >
          <PublicIcon />
        </button>
        {open ? (
          <Box className={style.langDropdown}>
            <ul className={style.langList}>
              <li>
                <img
                  src={EnglishFlag}
                  alt="English"
                  className={style.flagImage}
                  onClick={englishLangClick}
                />
              </li>
              <li>
                <img
                  src={IranFlag}
                  alt="فارسی"
                  className={style.flagImage}
                  onClick={persianLangClick}
                />
              </li>
              <li>
                <img
                  src={KoreaFlag}
                  alt="한국어"
                  className={style.flagImage}
                  onClick={koreanLangClick}
                />
              </li>
            </ul>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
export default ChangeLang;
