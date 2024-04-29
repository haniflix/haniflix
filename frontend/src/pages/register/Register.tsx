import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StripePaymentForm from "../../components/StripePaymentForm";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./register.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { addClassNames } from "../../store/utils/functions";

const Register = () => {
  const [username, setUsername] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email address is required");
    } else if (!/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateRepeatPassword = (value) => {
    if (!value) {
      setRepeatPasswordError("Repeat Password is required");
    } else if (value !== password) {
      setRepeatPasswordError("Passwords do not match");
    } else {
      setRepeatPasswordError("");
    }
  };

  useEffect(() => {
    setIsFormValid(!emailError && !passwordError && !repeatPasswordError && !usernameError);
  }, [emailError, passwordError, repeatPasswordError, usernameError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    if (isFormValid){
      setShowPaymentForm(true)}

    setEmailError("Email field is empty")
    setPasswordError("Password field is empty")
    setUsernameError("Username field is empty")
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value
    setUsername(value)
    if (value.length < 6) {
      setUsernameError("Username must be at least 6 characters long");
    }
    setUsernameError("")
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleRepeatPassword = (event) => {
    const value = event.target.value;
    setRepeatPassword(value);
    validateRepeatPassword(value);
  };  

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <>
      <div className={addClassNames(styles["loginNew"])}>
        <div className={styles["top"]}>
          <div className={styles["wrapper"]}>
            <a href={"/"} className="link">
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

        <div className={styles["section"]}>
          <div className={styles["intro-section"]}>
            <h2 className="text-white font-[500] text-[25px] m-[auto] w-[fit-content]">
              Sign Up
            </h2>
            <div className="h-[1px] bg-[#4B4B4B] mt-4 mb-3" />
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: "450px", width: "100%" }}
            >
              <div className={styles["inputWrapper"]}>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  onChange={handleUsernameChange}
                  value={username}
                />
              </div>
              <small className="text-red-600">{usernameError.length > 1 && usernameError}</small>


              <div className={styles["inputWrapper"]}>
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  name="email"
                  onChange={handleEmailChange}
                  value={email}
                />
              </div>
              <small className="text-red-600">{emailError.length > 1 && emailError}</small>

              <div className={styles["inputWrapper"]}>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  value={password}
                />
              </div>
               <small className="text-red-600">{passwordError.length > 0 && passwordError}</small>

              <div className={styles["inputWrapper"]}>
                <input
                  id="repeatPassword"
                  name="repeatPassword"
                  type="password"
                  placeholder="Repeat Password"
                  onChange={handleRepeatPassword}
                />
              </div>
                <small className="text-red-600"> {repeatPasswordError.length > 0 && repeatPasswordError}</small>

              <button
                className="registerButton"
                type="button"
                disabled={!isFormValid}
                onClick={handleSubmit}
                style={{ color: "#fff" }}
              >
                Sign Up
              </button>
            </form>

            {showPaymentForm && (
              <div className="payment-modal">
                <h2 className="text-white">Continue for $4.99/month</h2>
                <StripePaymentForm newUser={{ email, password, repeatPassword, username }} />
              </div>
            )}

            <div className="text-white text-md text-center">
              <span> Already have an account? </span>
              <span>
                <Link className={styles["link"]} to={{ pathname: "/login" }}>
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
