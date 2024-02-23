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
import { selectUser } from "./store/reducers/auth";
import Welcome from "./pages/welcome/Welcome";

import AppRouter from "./router/AppRouter";

import './index.css'
import { SocketProvider } from "./context/SocketContext";

import * as React from 'react'

const App = () => {
  const user = useAppSelector(selectUser);




  return (
    <>
      <SocketProvider>
        <AppRouter />
        <CookieConsent
          style={{ background: "rgba(0,0,0,0.7)"}}
          disableButtonStyles
          buttonClasses="gradientButton"
          buttonStyle={{ margin: 10,}}
        >
          This website uses cookies to enhance the user experience.
        </CookieConsent>
      </SocketProvider>
    </>
  );
};

export default App;
