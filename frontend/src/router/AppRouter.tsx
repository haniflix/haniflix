import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Watch from "../pages/watch/Watch";
import Login from "../pages/login/Login";
import Verify from "../pages/verify/Verify";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import ChangePassword from "../pages/change-password/ChangePassword";
import SearchPage from "../pages/search/SearchPage";
import AccSettings from "../pages/user-settings/AccSettings";
import CookieConsent from "react-cookie-consent";
import {
    BrowserRouter as Router,
    Route,
    Navigate,
    Routes,
} from "react-router-dom";
import MyLists from "../pages/my-lists/MyLists";

import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/reducers/auth";
import Welcome from "../pages/welcome/Welcome";
import ProtectedRoutes from "./ProtectedRoutes";
import GuestRoutes from "./GuestRoutes";




const AppRouter = (props) => {
    const user = useAppSelector(selectUser);

    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route index element={<Home />} />
                    <Route path="movies" element={<Home type="movies" />} />
                    <Route path="series" element={<Home type="series" />} />
                    <Route path="new-and-popular" element={<Home />} />
                    <Route path="watch/:id" element={<Watch />} />
                    <Route path="my-list" element={<MyLists />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="settings" element={<AccSettings />} />
                </Route>

                <Route element={<GuestRoutes />}>
                    <Route index element={<Welcome />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-pass" element={<ForgotPassword />} />
                    <Route path="change-password/:id/:email" element={<ChangePassword />} />
                    <Route path="login" element={<Login />} />
                    <Route path="verify" element={<Verify />} />
                </Route>

            </Routes>
        </Router>
    )
}

export default AppRouter