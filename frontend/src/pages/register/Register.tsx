import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import StripePaymentForm from "../../components/StripePaymentForm";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./register.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { addClassNames } from "../../store/utils/functions";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/rtk-query/authApi";

const api_url = import.meta.env.VITE_APP_API_URL;

const Register = () => {
  const [login, loginState] = useLoginMutation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const session_id = searchParams.get("session_id");
  console.log(success);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [verifyingStatus, setVerifyingStatus] = React.useState(false);
  const [ran, setRan] = React.useState(false);

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
    setIsFormValid(
      !emailError && !passwordError && !repeatPasswordError && !usernameError
    );
  }, [emailError, passwordError, repeatPasswordError, usernameError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setShowPaymentForm(true);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (value.length < 6) {
      setUsernameError("Username must be at least 6 characters long");
    }
    setUsernameError("");
  };

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
  // console.log("email", email);
  // console.log("username", username);
  // console.log("password", password);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const checkout = () => {

    if (!email || !password ) {
      validateEmail(email)
      validatePassword(password)
      validateRepeatPassword('value')
      return 
    }

    localStorage.setItem("haniemail", email);
    localStorage.setItem("hanipassword", password);
    console.log(api_url)
    fetch(
      api_url + "auth/v1/create-subscription-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ email, username, password }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        console.log(res);
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          title: "Error",
          text: e.statusText,
          icon: "error",
        });
      });
  };
  const onLogin = async (email: string, password: string) => {
    console.log("i tried logging in");
    const res = await login({ email, password });
    console.log(res)
    if (res?.data) {
      console.log("Login successful");
    }

    if (!res?.data) {
      Swal.fire({
        title: res?.error.message || "Error encountered during login",
        text: res?.error.message,
        icon: "error",
      });
    }
  };

  React.useEffect(() => {
    console.log(" i ran ");
    if (success) {
      console.log(ran);
      setVerifyingStatus(true);
      setRan(true);

      axios
        .post(api_url + "auth/v1/payment-success", {
          sessionId: session_id,
          email,
          password,
          username,
        })
        .then(async (res) => {
          // alert();
          Swal.fire({
            title: "Success",
            text: "Success! Check your email for the invoice. You can proceed to login",
            icon: "success",
          });
          setVerifyingStatus(false);
          // navigate("/login");
          const savedEmail = localStorage.getItem("haniemail");
          const savedPassword = localStorage.getItem("hanipassword");

          console.log(savedEmail, "savedEmail");
          console.log(savedPassword, "savedPassword");
          await onLogin(savedEmail, savedPassword);
          // .then(() => {
          //   console.log("i tried logging in");
          //   // navigate("/login");
          //   localStorage.removeItem("haniemail");
          //   localStorage.removeItem("hanipassword");
          // });
          console.log(" after trying to login");
          console.log(res.data.message);
        })

        .catch((e) => {
          setVerifyingStatus(false);
          Swal.fire({
            title: "Success",
            text: e.error,
            icon: "success",
          });
          console.log(e.error);
        });
    }
  }, []);

  return (
    <>
      {verifyingStatus && (
        <div className="w-screen h-screen flex items-center justify-center">
          <ClipLoader color="white" size={"1.5rem"} />
        </div>
      )}
      {!verifyingStatus && (
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
                  <small className="text-red-600">
                    {usernameError.length > 1 && usernameError}
                  </small>

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
                  <small className="text-red-600">
                    {emailError.length > 1 && emailError}
                  </small>

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
                  <small className="text-red-600">
                    {passwordError.length > 0 && passwordError}
                  </small>

                  <div className={styles["inputWrapper"]}>
                    <input
                      id="repeatPassword"
                      name="repeatPassword"
                      type="password"
                      placeholder="Repeat Password"
                      onChange={handleRepeatPassword}
                    />
                  </div>
                  <small className="text-red-600">
                    {" "}
                    {repeatPasswordError.length > 0 && repeatPasswordError}
                  </small>

                  <button
                    className="registerButton"
                    type="button"
                    disabled={!isFormValid}
                    // onClick={handleSubmit}
                    onClick={checkout}
                    // checkout
                    style={{ color: "#fff" }}
                  >
                    Sign Up
                  </button>
                </form>

                {/* {showPaymentForm && (
                  <div className="payment-modal" onClick={checkout}>
                    <h2 className="text-white">Continue for $4.99/month</h2>
                    {/* <StripePaymentForm newUser={{ email, password, repeatPassword, username }} /> */}
                {/* </div> */}

                <div className="text-white text-md text-center">
                  <span> Already have an account? </span>
                  <span>
                    <Link
                      className={styles["link"]}
                      to={{ pathname: "/login" }}
                    >
                      Sign in
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Register;
