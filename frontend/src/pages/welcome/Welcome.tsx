import { useCallback, useEffect, useRef, useState } from "react";
import "./welcome.scss";
import Swal from "sweetalert2";
import Logo from "../../Assets/Images/Nav-logo.png";
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



  return (
    <div className="welcomePage">
      <Box
        className="top"
        style={{ maxWidth: 1200, marginLeft: "auto", marginRight: "auto" }}
      >
        <div
          className="wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a href={"/"} className="link">
            <img
              className="logo"
              src={Logo}
              width="100px"
              //height="100px"
              alt=""
              loading="lazy"
            />
          </a>
          <Box
            className="gradientButton"
            //onClick={onSignUp}
            whiteSpace={"nowrap"}
            paddingX={3}
            marginX={1}
            maxWidth={100}
            component={"button"}
            onClick={() => navigate("/login")}
          >
            Sign In
          </Box>
        </div>
      </Box>

      <div className="get-started-section">
        <h1>Unlimited movies, TV shows, and more</h1>
        <p style={{ marginBottom: 25 }}>
          Plan is only $4.99/month. Watch anywhere. Cancel anytime.
        </p>
        <p style={{ marginBottom: 10 }}>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <Box
          // display={"flex"}
          //width={"40%"}
          marginLeft={"auto"}
          marginRight={"auto"}
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              width: "80%",
            },
            [theme.breakpoints.up("sm")]: {
              width: "40%",
            },
          })}
        >
          <Grid container>
            <Grid item xs={0} sm={1} />
            <Grid item xs={12} sm={6}>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                className="gradientButton"
                onClick={onSignUp}
                whiteSpace={"nowrap"}
                paddingX={3}
                component={"button"}
                display={"flex"}
                alignItems={"center"}
                sx={(theme) => ({
                  // marginTop: { sx: 1, sm: undefined },
                  // marginLeft: { sx: "auto", sm: 2 },
                  // marginRight: { sx: "auto", sm: undefined },
                  [theme.breakpoints.only("xs")]: {
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 1,
                  },
                  [theme.breakpoints.up("sm")]: {
                    marginLeft: 2,
                  },
                })}
              >
                Get started
                <ArrowForwardIos />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>

      <TopSection />

      <Section
        title="Discover the ultimate streaming service"
        description="Unlimited award-winning TV shows, movies, and more in 4k and ad-free on any device for only $4.99/month!"
        imageUrl="/images/1.png"
      />

      <Section
        title="Enjoy on your TV"
        description="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        imageUrl="/images/2.png"
      />

      <Section
        title="Download your shows to watch offline"
        description="Save your favorites easily and always have something to watch."
        imageUrl="/images/3.png"
      />

      <Section
        title="Watch everywhere"
        description="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        imageUrl="/images/4.webp"
      />

      <Section
        title="Create profiles for kids"
        description="Send kids on adventures with their favorite characters in a space made for just them — free with your membership"
        imageUrl="/images/5.png"
      />

      <Box className="section">
        <h1 style={{ textAlign: "center", marginTop: 50, marginBottom: 50 }}>
          Frequently Asked Questions
        </h1>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <ThemeProvider theme={darkTheme}>
              <div>
                <Accordion
                  expanded={expanded === "panel1"}
                  onChange={() => handleExpand("panel1")}
                >
                  <AccordionSummary
                    // expandIcon={<ExpandMoreIcon />}
                    expandIcon={<ArrowDownward />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      What is Haniflix?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        Haniflix is a streaming service that offers a wide
                        variety of award-winning TV shows, movies, anime,
                        documentaries, and more on thousands of
                        internet-connected devices.
                      </p>
                      <p>
                        You can watch as much as you want, whenever you want
                        without a single commercial – all for one low monthly
                        price. There's always something new to discover and new
                        TV shows and movies are added every week!
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel2"}
                  onChange={() => handleExpand("panel2")}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      How much does Haniflix cost?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        Watch Haniflix on your smartphone, tablet, Smart TV,
                        laptop, or streaming device, all for one fixed monthly
                        fee. Plan is $4.99 a month. No extra costs, no
                        contracts.
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel3"}
                  onChange={() => handleExpand("panel3")}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      Where can I watch?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        Watch anywhere, anytime. Sign in with your Haniflix
                        account to watch instantly on the web at Haniflix.com
                        from your personal computer or on any internet-connected
                        device that offers the Haniflix app, including smart
                        TVs, smartphones, tablets, streaming media players and
                        game consoles.
                      </p>
                      <p>
                        You can also download your favorite shows with the iOS,
                        Android, or Windows 10 app. Use downloads to watch while
                        you're on the go and without an internet connection.
                        Take Haniflix with you anywhere.
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  expanded={expanded === "panel4"}
                  onChange={() => handleExpand("panel4")}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      How do I cancel?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        Haniflix is flexible. There are no pesky contracts and
                        no commitments. You can easily cancel your account
                        online in two clicks. There are no cancellation fees –
                        start or stop your account anytime.
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel5"}
                  onChange={() => handleExpand("panel5")}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      What can I watch on Haniflix?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        Haniflix has an extensive library of feature films,
                        documentaries, TV shows, anime, award-winning Haniflix
                        originals, and more. Watch as much as you want, anytime
                        you want.
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded === "panel6"}
                  onChange={() => handleExpand("panel6")}
                >
                  <AccordionSummary
                    expandIcon={<ArrowDownward />}
                    //expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <p style={{ fontSize: "1.8em", padding: "0.5em" }}>
                      Is Haniflix good for kids?
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div style={{ fontSize: "1em", padding: "0.5em" }}>
                      <p>
                        The Haniflix Kids experience is included in your
                        membership to give parents control while kids enjoy
                        family-friendly TV shows and movies in their own space.
                      </p>
                      <p>
                        Kids profiles come with PIN-protected parental controls
                        that let you restrict the maturity rating of content
                        kids can watch and block specific titles you don’t want
                        kids to see.
                      </p>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            </ThemeProvider>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>

        <div>
          <Box textAlign={"center"} component={"p"} marginTop={5}>
            Ready to watch? Enter your email to create or restart your
            membership.
          </Box>
          <Box
            // display={"flex"}
            //width={"40%"}
            marginLeft={"auto"}
            marginRight={"auto"}
            sx={(theme) => ({
              [theme.breakpoints.only("xs")]: {
                width: "80%",
              },
              [theme.breakpoints.up("sm")]: {
                width: "40%",
              },
            })}
          >
            <Grid container>
              <Grid item xs={0} sm={1} />
              <Grid item xs={12} sm={6}>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  className="gradientButton"
                  onClick={onSignUp}
                  whiteSpace={"nowrap"}
                  paddingX={3}
                  component={"button"}
                  display={"flex"}
                  alignItems={"center"}
                  sx={(theme) => ({
                    // marginTop: { sx: 1, sm: undefined },
                    // marginLeft: { sx: "auto", sm: 2 },
                    // marginRight: { sx: "auto", sm: undefined },
                    [theme.breakpoints.only("xs")]: {
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: 1,
                    },
                    [theme.breakpoints.up("sm")]: {
                      marginLeft: 2,
                    },
                  })}
                >
                  Get started
                  <ArrowForwardIos />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
      <Box className="section"></Box>
    </div>
  );
}
