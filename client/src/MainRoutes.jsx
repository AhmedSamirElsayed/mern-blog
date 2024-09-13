import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage ";
import Projectspage from "./pages/Projectspage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
      </Route>
      <Route path="/projects" element={<Projectspage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
