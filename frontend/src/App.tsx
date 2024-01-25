import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Verify from "./pages/verify/Verify";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import SearchPage from "./pages/search/SearchPage";
import AccSettings from "./pages/user-settings/AccSettings";
import CookieConsent from "react-cookie-consent";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import MyLists from "./pages/my-lists/MyLists";
import { useAppSelector } from "./store/hooks";
import { selectUser } from "./store/auth";
import Welcome from "./pages/welcome/Welcome";

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Welcome />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/forgot-pass"
            element={user ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/change-password/:id/:email"
            element={user ? <Navigate to="/" /> : <ChangePassword />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/verify" element={<Verify />} />
          {user && (
            <>
              <Route path="/movies" element={<Home type="movies" />} />

              <Route path="/series" element={<Home type="series" />} />

              <Route path="/watch/:id" element={<Watch />} />

              <Route path="/my-list" element={<MyLists />} />

              <Route path="/new-and-popular" element={<Home />} />

              <Route path="/search" element={<SearchPage />} />

              <Route path="/settings" element={<AccSettings />} />
            </>
          )}
        </Routes>
      </Router>
      <CookieConsent
        disableButtonStyles
        buttonClasses="gradientButton"
        buttonStyle={{ margin: 10 }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
};

export default App;
