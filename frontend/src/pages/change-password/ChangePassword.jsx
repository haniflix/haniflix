import React, { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import "../../Assets/css/styles.scss";
import styles from "./change.module.scss";
import { change } from "../../context/forgot/changePass";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";
import { addClassNames } from "../../store/utils/functions";

const showSwal = (title, message, type) => {
  Swal.fire({
    title: title ?? "",
    text: message,
    icon: type,
  });
};

export default function ChangePassword() {
  const { id, email } = useParams();
  const [emailId] = useState(email);
  console.log(id, email);

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

  const passwordRef = useRef();
  const repeatPasswordRef = useRef();

  const handleStart = () => {
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      showSwal("", "Both passwords do not match!", "error");
      return false;
    } else if (repeatPasswordRef.current.value.length < 6) {
      showSwal("", "Password must contain at least 6 characters!", "error");
      repeatPasswordRef.current.focus();
      return false;
    } else {
      const user = {
        username: emailId,
        email: emailId,
        password: repeatPasswordRef.current.value,
      };

      change(user);
    }
  };

  return (
    <>
      {/* <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet> */}
      <div
        style={{
          height: isMobile ? imageHeightInScreen : "100%",
          backgroundSize: isMobile ? "contain" : "cover",
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

        <div className={styles["section"]}>
          <div className={styles["intro-section"]}>
            <div className={styles["inputWrapper"]}>
              <input type="password" placeholder="Password" ref={passwordRef} />
            </div>
            <div className={styles["inputWrapper"]}>
              <input
                type="password"
                placeholder="Repeat Password"
                ref={repeatPasswordRef}
              />
              <br />
            </div>
            <button className="registerButton" onClick={handleStart}>
              Confirm
            </button>
            <br />
            <div className="flex justify-center">
              <Link className="link text-dark" to={{ pathname: "/login" }}>
                Already registered? <span className="underline">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
