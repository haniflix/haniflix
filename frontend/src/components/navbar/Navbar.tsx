import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import React, { useState } from "react";
import NavLogo1 from "../../Assets/Images/Nav-logo.png";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom'
import SocketContext from "../../context/SocketContext";

import { useSelector } from 'react-redux'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAppSelector(selectUser);
  // const userName = user?.fullname;
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const [loginCalled, setLoginCalled] = useState(false)
  const [socketId, setSocketId] = useState<any>()

  const authReducer = useSelector((state) => state.auth);

  const { socket, handleUserLogin } = React.useContext(SocketContext);

  React.useEffect(() => {
    socket?.on("forceLogout", (reason) => {
      alert('Your account was logged into, in another device')
    });
    socket?.on('connect', () => {
      console.log(socket.id); // an alphanumeric id...
      setSocketId(socket.id)
    });
  }, [socket])


  React.useEffect(() => {
    if (!socket) return
    if (!socketId) return
    if (loginCalled) return


    const userId = authReducer?.user?._id;
    // console.log('userId ', userId)

    if (userId && (loginCalled == false)) {
      console.log('abt to call')
      handleUserLogin(userId, socket, socketId)
      setLoginCalled(true)
    }
  }, [socket, socketId, loginCalled])

  // console.log('login called ', loginCalled)
  // console.log('socket ', socket?.id)


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const logout = () => {
    dispatch(setUser(null));

    window.location.href = "/";
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container" id="nav-desktop-container">
        <div className="left" style={{ width: "100%", height: "100px" }}>
          <img src={NavLogo1} alt="" width={100} height={100} loading="lazy" />
          <Link className="link" to="/">
            <span>Home</span>
          </Link>
          <Link className="link" to="/series">
            <span>Series</span>
          </Link>
          <Link className="link" to="/movies">
            <span>Movies</span>
          </Link>
          <Link className="link" to="/new-and-popular">
            <span>New and Popular</span>
          </Link>
          <Link className="link" to="/my-list">
            <span>My List</span>
          </Link>
        </div>
        <div className="right">
          <Link className="link" to="/search">
            <Search className="icon" />
          </Link>
          <span>{user?.fullname}</span>
          <Notifications className="icon" />
          <img src={NavLogo1} alt="" width="50px" height="50px" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span style={{ color: "#000" }}>Hello {user?.fullname}!</span>
              <Link className="link" to="/settings">
                {" "}
                <span style={{ color: "#000" }}>Settings</span>
              </Link>
              <span style={{ color: "#000" }} onClick={logout}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-header">
        <div
          onClick={() => navigate('/')}
          className="mobile-logo-cont cursor-pointer">
          <img src={NavLogo1} alt="" className="mobile-logo" />
        </div>
        <div
          className="menu-toggle-container"
          onClick={function () {
            const menu = document.getElementById("mobile-header-list");
            if (menu.style.display === "none") {
              menu.style.display = "block";
              console.log("menu shown");
            } else {
              menu.style.display = "none";
              console.log("menu hidden");
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
            fill='#fff'
          >
            <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
          </svg>
        </div>
      </div>
      <div id="mobile-header-list" style={{ display: "none" }}>
        <div className="mobile-header-list-item">
          <Link className="link" to="/">
            <span>Home</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/series">
            <span>Series</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/movies">
            <span>Movies</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/new-and-popular">
            <span>New and Popular</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/my-list">
            <span>My List</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/settings">
            <span>Settings</span>
          </Link>
        </div>

        <div
          className="mobile-header-list-item"
          onClick={() => {
            logout();
          }}
        >
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
