import { useCallback, useEffect, useRef, useState } from "react";

import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../context/login/apiCalls";
import "../../Assets/css/styles.scss";
import landingBg from "../../Assets/Images/landing-bg.png";
import useApiClient from "../../hooks/useApiClient";
import { useDispatch } from "react-redux";
import { selectUser, setUser } from "../../store/reducers/auth";
import { useAppSelector } from "../../store/hooks";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  Add,
  ArrowDownward,
  ArrowForward,
  ArrowForwardIos,
} from "@mui/icons-material";
import Section from "./Section";
import TopSection from "./TopSection";

import styles from './welcome.module.scss'
import { addClassNames } from "../../store/utils/functions";

import createProfile from '../../Assets/Images/createProfile.png'
import accordionBg from '../../Assets/Images/accordionBg.png'
import watchEvrywhere from '../../Assets/Images/watchEvrywhere.png'
import discoverImg from '../../Assets/Images/discoverImg.png'

import {
  ChevronDown,
  TranslateIcon
} from '../../Assets/svgs/tsSvgs'
import AppAccordion from "./AppAccordion";

import { PiTelevisionSimpleFill } from "react-icons/pi";
import { MdPeopleAlt } from "react-icons/md";

import gradientStar from '../../Assets/Images/gradientStar.png'


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [expanded, setExpanded] = useState<string | false>("none");

  // const authReducer = useAppSelector(state = state.auth)

  const navigate = useNavigate();

  const onSignUp = useCallback(() => {
    navigate(`/register?email=${email}`);
  }, [email]);

  const handleExpand = (panel: string) => {
    setExpanded((curr) => (curr == panel ? "none" : panel));
  };

  const accordionItems = [
    {
      id: "panel1",
      title: "What is Haniflix?",
      content: `Haniflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
      You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`,
    },
    {
      id: "panel2",
      title: "How much does Haniflix cost?",
      content: `Watch Haniflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plan is only $4.99/month. No extra costs, no contracts.`,
    },
    {
      id: "panel3",
      title: "Where can I watch?",
      content: `Watch anywhere, anytime. Sign in with your Haniflix account to watch instantly on the web at Haniflix.com from your personal computer or on any internet-connected device that offers the Haniflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
\n\nYou can also download your favorite shows only on iOS, Android, or Windows devices. Use downloads to watch while you're on the go and without an internet connection. Take Haniflix with you anywhere.`,
    },
    {
      id: "panel4",
      title: "How do I cancel?",
      content: `Haniflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`,
    },
    {
      id: "panel5",
      title: "What can I watch on Haniflix?",
      content: `Haniflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Haniflix originals, and more. Watch as much as you want, anytime you want.`,
    },
    {
      id: "panel6",
      title: "Is Haniflix good for kids?",
      content: `The Haniflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
      Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`,
    },
  ];


  return (
    <div className={styles["welcomePage"]}>
      <div className='absolute pointer-events-none top-0 right-0 left-0 h-[60px] bg-gradient-to-b from-black to-transparent'></div>
      <Box
        className={styles["top"]}
        style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
      >
        <div
          className={
            addClassNames(
              styles['wrapper'],
              " flex pt-9 pb-6 items-center justify-between pl-3 pr-[80px]"
            )
          }
        >
          <a href={"/"} className={styles["link"]}>
            <img
              className={styles["logo"]}
              src={Logo}
              width="100px"
              //height="100px"
              alt=""
              loading="lazy"
            />
          </a>
          <div
            className="flex items-center gap-[10px]">
            <button
              className={
                addClassNames(
                  styles["app_button"], '!w-[fit-content] px-[12px] flex items-center gap-[7px]'
                )
              }
            >
              <TranslateIcon />
              English
              <ChevronDown />
            </button>
            <button
              className={
                addClassNames(
                  styles["app_button"], '!w-[fit-content] px-[12px]'
                )
              }
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </Box>

      <div className={styles["get-started-section"]}>
        <h1>Unlimited movies, TV shows, and more</h1>
        <p style={{ marginBottom: 25 }}>
          Plan is only $4.99/month. Watch anywhere. Cancel anytime.
        </p>
        <p style={{ marginBottom: 10 }}>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className={
          addClassNames(
            "flex w-[50%] mx-[auto]",
            styles['inputWrapper']
          )
        }>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className={styles["app_button"]}
            onClick={onSignUp}
          >
            Get Started
          </button>
        </div>

      </div>

      <TopSection />

      <Section
        title="Discover the ultimate streaming service"
        description="Unlimited award-winning TV shows, movies, and more in 4k and ad-free on any device for only $4.99/month!"
        imageUrl={discoverImg}
        imagePosition="right"
        icon={<div className="h-[56px] w-[56px] mb-[25px]">
          <img alt="" src={gradientStar} />
        </div>}
      />

      <Section
        title="Watch everywhere"
        description="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        imageUrl={watchEvrywhere}
        imagePosition="left"
        icon={<div
          className={
            addClassNames(
              "h-[56px] w-[56px] mb-[25px] flex items-center justify-center rounded-[50%]",
              styles['section_icon_wrapper']
            )
          }
        >
          <PiTelevisionSimpleFill />
        </div>
        }
      />

      <Section
        title="Create profiles for kids"
        description="Send kids on adventures with their favorite characters in a space made for just them — free with your membership"
        imageUrl={createProfile}
        imagePosition="right"
        icon={<div
          className={
            addClassNames(
              "h-[56px] w-[56px] mb-[25px] flex items-center justify-center rounded-[50%]",
              styles['section_icon_wrapper']
            )
          }
        >
          < MdPeopleAlt />
        </div>
        }
      />


      < div
        className="bg-black "
      >
        <div
          className={styles["footer-wrapper"]}
        >
          <div
            className={
              addClassNames(
                styles["blur_bg"],
                'mx-[70px] py-[20px] px-[20px] mt-[100px] rounded-[10px] flex  gap-y-[12px] flex-col justify-center'
              )
            }
          >
            <div className='mb-[3px] text-[22px]'>Support</div>
            <div className='text-[20px]'>Frequently asked questions</div>
            <div className='text-[20px]'>Everything you need to know about the product, subscription and billing.</div>
          </div>
          <div
            className='mx-[70px]'
          >
            <AppAccordion items={accordionItems} />
          </div>
          <div
            className={
              addClassNames(
                styles["blur_bg"],
                'mx-[70px] py-[20px] px-[45px] mt-[100px] rounded-[10px] flex items-center flex-col justify-center'
              )
            }
          >
            <div className='text-[25px] text-center mb-[24px]'>
              Ready to watch? Enter your email to create or restart your
              membership.
            </div>

            <div className={
              addClassNames(
                "flex w-[50%] mx-[auto]",
                styles['inputWrapper']
              )
            }>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={styles["app_button"]}
                onClick={onSignUp}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
