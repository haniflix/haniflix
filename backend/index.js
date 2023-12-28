const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const allowed_ips = [
  "http://50.62.182.51:4000",
  "http://admin.haniflix.com:4000",
  "http://haniflix.com",
  "http://localhost:3000",
];

app.use(express.json());

app.options("*", cors({ origin: allowed_ips, optionsSuccessStatus: 200 }));
app.use(cors({ origin: allowed_ips, optionsSuccessStatus: 200 }));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.listen(8800, () => {
  console.log("Backend server is running on port 8800!");
});
