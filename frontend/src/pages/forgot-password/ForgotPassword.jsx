import React, { useRef } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import { forgot } from "../../context/forgot/apiCalls";
import { Link } from "react-router-dom";

import styles from "./forgot.module.scss";

import { Helmet } from "react-helmet";
import { addClassNames } from "../../store/utils/functions";

const validateEmail = (email) => {
  var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  return emailReg.test(email);
};

const showSwal = (title, message, type) => {
  Swal.fire({
    title: title ?? "",
    text: message,
    icon: type,
  });
};

export default function ForgotPassword() {
  const emailRef = useRef();

  const [appHeight, setAppHeight] = React.useState(window.innerHeight);
  const [appWidth, setAppWidth] = React.useState(window.innerWidth);
  const [isMobile, setIsMobile] = React.useState(
    window.matchMedia("(pointer: coarse)").matches
  );

  React.useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight); // Update appHeight
      setAppWidth(window.innerWidth); // Update appWidth
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // Clean up listener
  }, [window.innerHeight, window.innerWidth]);

  const imageHeight = 1008;
  const imageWidth = 1440;

  const imageHeightInScreen = React.useMemo(() => {
    const aspectRatio = imageHeight / imageWidth;
    const newHeight = aspectRatio * appWidth;
    return newHeight;
  }, [imageHeight, imageWidth, appWidth]);

  const handleStart = async () => {
    if (emailRef.current.value.length < 5) {
      Swal.fire({
        title: "",
        icon: "error",
        text: "Your email is invalid!",
      }).then((x) => {
        emailRef.current.focus();
      });
      return false;
    } else if (!validateEmail(emailRef.current.value)) {
      showSwal("", "Invalid email entered!", "error");
      return false;
    } else {
      const user = {
        username: emailRef.current.value,
        email: emailRef.current.value,
      };

      const response = (await forgot(user))?.response;
      console.log("res", response?.data);

      if (response.status === 200) {
        console.log("Password reset email sent successfully!");
        Swal.fire({
          title: "Hurray!",
          text: "Your reset link has been sent to email!",
          icon: "success",
          timer: 1500,
        });

        do_redirect();
      } else {
        // API call failed due to unexpected status code
        console.error("Unexpected error:", response.data?.statusText);
        showSwal("Error encountered", response?.data?.statusText, "error");
      }
    }
  };

  const do_redirect = () => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
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
          // height: isMobile ? imageHeightInScreen : "100%",
          // backgroundSize: isMobile ? "contain" : "cover",
        }}
        className={addClassNames(styles["loginNew"])}
      >
        <div className={styles["top"]}>
          <div className={styles["wrapper"]}>
            <a href={"/"} className={styles["link"]}>
              <img
                className={styles["logo"]}
                src={Logo}
                width="100px"
                height="100px"
                alt=""
              />
            </a>
          </div>
        </div>

        {/*<div className="section">
          <div className="intro-section">
              <h1>Welcome to Haniflix</h1><br/>
              <h3>We are the ultimate streaming service offering unlimited award-winning TV shows, movies, and more in 4k on any device ad-free for only $4.99/month!</h3><br/>
              Watch anywhere. Cancel anytime.<br/>
              Forgot your password?
              <br></br>
              <div class="circle pulse arrow-down">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
              </div>
          </div>
  </div>*/}

        <div className={styles["section"]}>
          <div className={styles["intro-section"]}>
            <h2 className="text-white font-[500] text-[25px] m-[auto] w-[fit-content]">
              Forgot Password?
            </h2>
            <div className="h-[1px] bg-[#4B4B4B] mt-4 mb-3" />
            <div className={styles["inputWrapper"]}>
              <input
                type="email"
                placeholder="Email Address"
                ref={emailRef}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className={styles["registerButton"]}
              style={{ color: "#fff" }}
              onClick={handleStart}
            >
              Submit
            </button>
            <br />
            <div className="flex items-center justify-center">
              <Link className="link " to={{ pathname: "/login" }}>
                Remember password? <span className="underline">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
