import React, { useCallback, useEffect, useRef, useState } from "react";
import "./login.scss";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Nav-logo.png";
import { Link } from "react-router-dom";
// import { login } from "../../context/login/apiCalls";
import "../../Assets/css/styles.scss";
import landingBg from "../../Assets/Images/landing-bg.png";
import useApiClient from "../../hooks/useApiClient";
import { useDispatch } from "react-redux";
import { selectUser, setUser } from "../../store/reducers/auth";
import { useAppSelector } from "../../store/hooks";
import { useLoginMutation } from "../../store/rtk-query/authApi";

import SocketContext from "../../context/SocketContext";

export default function Login() {
  const emailRef = useRef();
  // const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const client = useApiClient();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [rememberMe, setRememberMe] = useState(false);

  const [login, loginState] = useLoginMutation()

  const { handleUserLogin } = React.useContext(SocketContext)

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const validateEmail = (email) => {
    return true;
    const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    return emailReg.test(email);
  };

  useEffect(() => {
    if (user != null) {
      window.location.href = "/";
    }
  }, [user]);

  const onLogin = async (email: string, password: string) => {
    const res = await login({ email, password, rememberMe })


    if (res?.data) {

      Swal.fire({
        title: "",
        text: "Login successful. Redirecting..",
        icon: "success",
        timer: 1500,
      }).then(function () {
        //   window.location.href = "/";
      });
    }

    if (!res?.data) {
      Swal.fire({
        title: res?.error?.data || "Error encountered during login",
        text: res.data,
        icon: "error",
      });
    }

  };

  const handleStart = useCallback(() => {
    if (!validateEmail(email)) {
      showSwal("", "Invalid email entered!", "error");
      return false;
    }
    if (password.length < 1) {
      showSwal("", "Your passwords is too short!", "error");
      return false;
    }
    // const user = { email, password };
    // console.log("user : ", user)
    // return;

    onLogin(email, password);

  }, [email, password, emailRef, rememberMe]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleStart(); // Trigger login on Enter key press
    }
  };

  return (
    <div
      className="loginNew"
      style={
        {
          // background: `url(${landingBg}) no-repeat center center`,
          // backgroundSize: "cover",
          // minHeight: "100vh",
        }
      }
    >
      <div className="top">
        <div className="wrapper">
          <a href={"/"} className="link">
            <img
              className="logo"
              src={Logo}
              width="100px"
              height="100px"
              alt=""
              loading="lazy"
            />
          </a>
        </div>
      </div>


      <div className="section">
        <div className="intro-section">
          <h2>Sign In to your account</h2>
          <input
            type="email"
            placeholder="Email"
            style={{ color: "#000" }}
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={{ color: "#000" }}
            // ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="loginButton" onClick={handleStart}>
            Sign In
          </button>
          <div className='flex items-center gap-2 w-[fit-content]'>
            <input
              type="checkbox"
              name="rememberMe"
              className="!h-[20px] !w-[20px] rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              checked={rememberMe}
              onClick={() => setRememberMe(!rememberMe)}
              onChange={() => { }}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">Remember Me</label>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <span style={{ color: "#222" }}>
                <Link className="link" to={{ pathname: "/register" }}>
                  New to Haniflix? Sign up now
                </Link>
              </span>
            </div>
            <div>
              <span style={{ color: "#222" }}>
                <Link className="link" to={{ pathname: "/forgot-pass" }}>
                  Forgot Password
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
