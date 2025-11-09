// Library
import { Route, Routes } from "react-router-dom";
// components
import ChangeLang from "@/language/ChangeLang";
import ToLogin from "@/pages/toLogin/ToLogin";
import ToSignUp from "@/pages/toSignUp/ToSignUp";
import WelcomePage from "@/pages/welcome/WelcomePage";
// Context
import { SaveInfoProvider } from "./context/SaveInfo";

export default function App() {
  return (
    <SaveInfoProvider>
      <ChangeLang />
      <Routes>
        <Route path="/" element={<ToLogin />} />
        <Route path="/signup" element={<ToSignUp />} />
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </SaveInfoProvider>
  );
}
