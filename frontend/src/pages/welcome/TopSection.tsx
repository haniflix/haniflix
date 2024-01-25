import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TopSection: React.FC = () => {
  const navigate = useNavigate();

  const onSignUp = () => {
    navigate(`/register`);
  };

  return (
    <Box className="top-section-container">
      <Box className="top-section section">
        <Grid container spacing={2} marginTop={5}>
          <Grid item sm={2} xs={0}></Grid>
          <Grid item sm={1} xs={12} display={"flex"} alignItems={"center"}>
            <img alt="" style={{ width: "125px" }} src="/images/popcorn.png" />
          </Grid>
          <Grid
            item
            sm={7}
            xs={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Box
              padding={2}
              width={"100%"}
              borderRadius={2}
              sx={(theme) => ({
                background: "rgba(255,255,255, 0.1)",
                [theme.breakpoints.only("xs")]: {
                  margin: 2,
                },
              })}
            >
              <Grid
                container
                alignItems={"center"}
                sx={(theme) => ({
                  [theme.breakpoints.only("xs")]: {
                    textAlign: "center",
                  },
                })}
              >
                <Grid item xs={12} sm={10} fontSize={12}>
                  <h1 style={{ fontSize: "2.5em" }}>
                    The Haniflix you love for only $4.99/month.
                  </h1>
                  <p style={{ fontSize: "1.5em" }}>
                    Get our affordable and ad-free plan.
                  </p>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <button
                    className="gradientButton"
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                    onClick={onSignUp}
                  >
                    Get started
                  </button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={2} xs={0}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopSection;
