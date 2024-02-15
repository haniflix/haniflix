import { useRef } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Nav-logo.png";
import "../../Assets/css/styles.scss";
import styles from "./change.module.scss";
import { change } from "../../context/forgot/changePass";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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
    <div className={styles["loginNew"]}>
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
  );
}
