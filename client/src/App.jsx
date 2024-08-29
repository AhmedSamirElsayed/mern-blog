import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage ";
import Projectspage from "./pages/Projectspage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/singin" element={<SigninPage />} />
        <Route path="/singup" element={<SignUpPage />} />
        <Route path="/projects" element={<Projectspage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
