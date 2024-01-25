import { Box, Grid } from "@mui/material";

interface SectionProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Section: React.FC<SectionProps> = ({ title, description, imageUrl }) => {
  return (
    <Box className="section">
      <Grid container spacing={2}>
        <Grid item sm={2} xs={0}></Grid>
        <Grid
          item
          sm={4}
          xs={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.up("sm")]: {
                padding: 10,
              },
              [theme.breakpoints.only("xs")]: {
                textAlign: "center",
                fontSize: 12,
                padding: 2,
              },
            })}
          >
            <h1>{title}</h1>
            <p>{description}</p>
          </Box>
        </Grid>
        <Grid
          item
          sm={4}
          xs={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <img alt="" src={imageUrl} />
        </Grid>
        <Grid item sm={2} xs={0}></Grid>
      </Grid>
    </Box>
  );
};

export default Section;
