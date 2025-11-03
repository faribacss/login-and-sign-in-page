// React Router imports for routing
import { Route, Routes } from 'react-router-dom';

// Page component imports
import ToLogin from '@/pages/toLogin/ToLogin';
import ToSignUp from '@/pages/toSignUp/ToSignUp';
import WelcomePage from '@/pages/welcome/WelcomePage';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ToLogin />} />
      <Route path="/signup" element={<ToSignUp />} />
      <Route path="/welcome" element={<WelcomePage />} />
    </Routes>
  );
}


