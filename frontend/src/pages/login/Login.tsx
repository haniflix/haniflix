import React, { useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
// import { login } from "../../context/login/apiCalls";
import landingBg from "../../Assets/Images/landing-bg.png";
import useApiClient from "../../hooks/useApiClient";
import { useDispatch } from "react-redux";
import { selectUser, setUser } from "../../store/reducers/auth";
import { useAppSelector } from "../../store/hooks";
import { useLoginMutation } from "../../store/rtk-query/authApi";

import { useNavigate } from 'react-router-dom'

import SocketContext from "../../context/SocketContext";

import styles from "./login.module.scss";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { addClassNames } from "../../store/utils/functions";

import { Helmet } from "react-helmet";

export default function Login() {
  const emailRef = useRef();

  const navigate = useNavigate()
  // const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const client = useApiClient();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [rememberMe, setRememberMe] = useState(false);

  const [login, loginState] = useLoginMutation()

  const { handleUserLogin } = React.useContext(SocketContext)


  const [appHeight, setAppHeight] = React.useState(window.innerHeight);
  const [appWidth, setAppWidth] = React.useState(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState(window.matchMedia('(pointer: coarse)').matches)


  React.useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight); // Update appHeight
      setAppWidth(window.innerWidth); // Update appWidth
      setIsMobile(window.matchMedia('(pointer: coarse)').matches)
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); // Clean up listener
  }, [window.innerHeight, window.innerWidth]);


  const imageHeight = 1008;
  const imageWidth = 1440;

  const imageHeightInScreen = React.useMemo(() => {
    const aspectRatio = imageHeight / imageWidth;
    const newHeight = aspectRatio * appWidth;
    return newHeight;
  }, [imageHeight, imageWidth, appWidth])


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

  // useEffect(() => {
  //   if (user != null) {
  //     window.location.href = "/";
  //   }
  // }, [user]);

  const onLogin = async (email: string, password: string) => {
    const res = await login({ email, password, rememberMe })


    if (res?.data) {
      console.log('Login successful')

    }

    if (!res?.data) {
      Swal.fire({
        title: res?.error?.data?.message || "Error encountered during login",
        text: res?.error?.data?.message,
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
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleStart(); // Trigger login on Enter key press
    }
  };

  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet> */}
      <div
        style={{
          height: isMobile ? "100%" : "100%",
          backgroundSize: isMobile ? "cover" : "cover",
        }}
        // style={{
        //   height: isMobile ? imageHeightInScreen : "100%",
        //   backgroundSize: isMobile ? "contain" : "cover",
        // }}
        className={
          addClassNames(styles['loginNew']
          )
        }
      >
        <div className={styles['top']}>
          <div className={styles["wrapper"]}>
            <a href={"/"} className="link">
              <img
                className="logo"
                src={Logo}
                width="100px"
                // height="100px"
                alt=""
                loading="lazy"
              />
            </a>
          </div>
        </div>


        <div className={styles['section']}>
          <div className={
            addClassNames(
              "bg-[#FFFFFF1A] rounded-[20px] px-[48px] py-[64px] ",
              styles["intro-section"]
            )
          }>
            <h2 className="text-white font-[500] text-[25px] m-[auto] w-[fit-content]" >Sign In</h2>
            <div
              className='h-[1px] bg-[#4B4B4B] mt-4 mb-3'
            />
            <div className={styles['inputWrapper']}>
              <input
                type="email"
                placeholder="Email Address"
                ref={emailRef}
                value={email}
                onKeyDown={handleKeyDown}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['inputWrapper']}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                // ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div
                className="cursor-pointer mr-2 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {
                  showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                }
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={
                addClassNames(
                  'flex items-center gap-2 w-[fit-content]',
                  styles['rememberMe_wrapper']
                )
              }>
                <input
                  type="checkbox"
                  name="rememberMe"
                  className={
                    addClassNames(
                      "!h-[20px] !w-[20px] rounded border border-white text-white shadow-sm",
                    )
                  }
                  checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  onChange={() => { }}
                />
                <label htmlFor="rememberMe" className="text-sm text-white">Remember Me</label>
              </div>

              <div>
                <span style={{ color: "#222" }}>
                  <Link className={styles["link"]} to={{ pathname: "/forgot-pass" }}>
                    Forgot Password
                  </Link>
                </span>
              </div>
            </div>
            <button className={styles["loginButton"]} onClick={handleStart}>
              Sign In
            </button>
            <div className='text-white text-md text-center' >
              <span>Don’t have an account?{' '}</span>
              <span style={{ color: "#222" }}>
                <Link className={styles["link"]} to={{ pathname: "/register" }}>
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
