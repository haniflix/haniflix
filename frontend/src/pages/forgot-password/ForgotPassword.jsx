import { useRef } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Nav-logo.png";
import "../../Assets/css/styles.scss";
import "./forgot.scss";
import { forgot } from "../../context/forgot/apiCalls";
import { Link } from "react-router-dom";

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

  const handleStart = () => {
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

      forgot(user);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      handleStart(); // Trigger login on Enter key press
    }
  };

  return (
    <div className="loginNew">
      <div className="top">
        <div className="wrapper">
          <a href={"/"} className="link">
            <img
              className="logo"
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

      <div className="section">
        <div className="intro-section">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Email"
            style={{ color: "#000" }}
            ref={emailRef}
            onKeyDown={handleKeyDown}
          />
          <button
            className="registerButton"
            style={{ color: "#fff" }}
            onClick={handleStart}
          >
            Send Link
          </button>
          <br />
          <Link className="link text-dark" to={{ pathname: "/login" }}>
            Remember your password? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
