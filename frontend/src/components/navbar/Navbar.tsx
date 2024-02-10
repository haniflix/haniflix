import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import React, { useState } from "react";
import NavLogo1 from "../../Assets/Images/Nav-logo.png";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUser, setUser, logout } from "../../store/reducers/auth";
import { useDispatch } from "react-redux";

import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addClassNames } from "../../store/utils/functions";
import GenresDropdown from "../GenresDropdown";

import "./navbar.scss";
import { useGetUserQuery } from "../../store/rtk-query/usersApi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const user = useAppSelector(selectUser);
  // const userName = user?.fullname;
  const dispatch = useAppDispatch();

  const navigate = useNavigate()

  const [loginCalled, setLoginCalled] = useState(false)

  // const authReducer = useAppSelector((state) => state.auth);
  const userId = user?._id;

  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

  const { data: userData, isLoading: userDataLoading, refetch: refetchUserData } = useGetUserQuery(userId)



  const showSwal = (title, message, type) => {
    Swal.fire({
      title: title ?? "",
      text: message,
      icon: type,
    });
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const onLogout = () => {
    dispatch(logout());

    // window.location.href = "/";
  };

  const makeImageUrl = (url) => {
    const BASE_URL = import.meta.env.VITE_APP_API_URL

    let imageSuffix = url?.replace('/api/', '')
    let finalUrl = `${BASE_URL}${imageSuffix}`

    return finalUrl
  }

  const renderMobileMenuList = () => {

    return (
      <div id="mobile-header-list"
        className={
          addClassNames(
            showMobileMenu ? 'block' : 'hidden'
          )
        }
      >
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
          <Link className="link" to="/edit-profile">
            <span>Edit Profile</span>
          </Link>
        </div>
        <div className="mobile-header-list-item">
          <Link className="link" to="/settings">
            <span>Account Settings</span>
          </Link>
        </div>

        <div
          className="mobile-header-list-item"
          onClick={() => {
            onLogout();
          }}
        >
          <span>Logout</span>
        </div>
      </div>
    )
  }

  const renderMobileMenuToggle = () => {
    return (
      <div className="mobile-header ">
        <div
          onClick={() => navigate('/')}
          className="mobile-logo-cont cursor-pointer">
          <img src={NavLogo1} alt="" className="mobile-logo" />
        </div>
        <div className='flex items-center gap-[5px]'>

          <Link className="link" to="/search">
            <Search className="icon" />
          </Link>
          <div className='text-xs' >{userData?.fullname}</div>

          <div>
            <Notifications className="icon" />
          </div>
          <Link className="" to="/settings">
            <div className='bg-gray-300 rounded-[8px] h-[50px] w-[50px]'>
              <img
                src={userData?.avatar ? makeImageUrl(userData?.avatar) : NavLogo1}
                alt=""
                className="w-full h-full"
              />
            </div>
          </Link>
          <div
            className="menu-toggle-container border !p-[8px]"
            onClick={function () {
              setShowMobileMenu(!showMobileMenu)
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
      </div>
    )
  }

  const renderDesktopMenu = () => {
    return (
      <div className="desk-container" id="nav-desktop-container">
        <div className="left" style={{ width: "100%", height: "100px" }}>
          <div
            onClick={() => navigate('/')}
            className='cursor-pointer'
          >
            <img src={NavLogo1} alt="" width={100} height={100} loading="lazy" />
          </div>
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
          <span>{userData?.fullname}</span>
          <Notifications className="icon" />
          <Link className="" to="/settings">
            <div className='bg-gray-300 rounded-[8px] h-[60px] w-[60px]'>
              <img
                src={userData?.avatar ? makeImageUrl(userData?.avatar) : NavLogo1}
                alt=""
                className="w-full h-full"
              />
            </div>
          </Link>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options !text-black py-[12px]">
              <span >Hello {userData?.fullname}!</span>
              <span>
                <Link className="" to="/edit-profile">
                  Edit Profile
                </Link>
              </span>
              <span>
                <Link className="" to="/settings">
                  Account Settings
                </Link>
              </span>
              <span onClick={onLogout}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      {renderDesktopMenu()}
      {renderMobileMenuToggle()}
      {
        renderMobileMenuList()
      }
      <GenresDropdown />
    </div>
  );
};

export default Navbar;
