import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import StripePaymentForm from "../../components/StripePaymentForm";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./register.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import { Input } from "@mui/material";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission logic
      setShowPaymentForm(true);
    },
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      formik.setFieldValue("email", email);
    }
  }, [searchParams]);

  const { handleSubmit, handleChange, values, errors, touched } = formik;

  const handleStart = () => {
    if (errors.email) {
      showSwal("Validation Error", errors.email, "error");
      return;
    }

    if (errors.password) {
      showSwal("Validation Error", errors.password, "error");
      return;
    }

    if (errors.repeatPassword) {
      showSwal("Validation Error", errors.repeatPassword, "error");
      return;
    }

    // Proceed to show payment form
    setShowPaymentForm(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleStart(); // Trigger login on Enter key press
    }
  }

  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  const [showPaymentForm, setShowPaymentForm] = React.useState(false);

  return (
    <div className={styles["loginNew"]}>
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

          <h2 className="text-white font-[500] text-[25px] m-[auto] w-[fit-content]" >Sign Up</h2>
          <div
            className='h-[1px] bg-[#4B4B4B] mt-4 mb-3'
          />
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "450px", width: "100%" }}
          >
            <div className={styles["inputWrapper"]}>
              <input
                type="email"
                placeholder="Email Address"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}

              />
            </div>
            <div className={styles["inputWrapper"]}>
              <input
                //fullwidth="true"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}

              />
            </div>
            <div className={styles["inputWrapper"]}>
              <input
                //fullWidth="true"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder="Repeat Password"
                value={values.repeatPassword}
                onChange={handleChange}

                onKeyDown={handleKeyDown}
              />
            </div>

            <button
              className="registerButton"
              type="button"
              onClick={handleStart}
              style={{ color: "#fff" }}
            >
              Sign Up
            </button>
          </form>

          {showPaymentForm && (
            <div className="payment-modal">
              <h2>Continue for $4.99/month</h2>
              <StripePaymentForm newUser={values} />
            </div>
          )}

          <div className="flex justify-center">
            <Link className="link text-dark" to={{ pathname: "/login" }}>
              Already have an account? <span className="underline">Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
