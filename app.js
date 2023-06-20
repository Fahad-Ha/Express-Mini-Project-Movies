const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./database");
const morgan = require("morgan");
const moviesRoutes = require("./api/movies/movies.routes");
const path = require("path");

const notfound = require("./middleware/notfound");
const errorhandle = require("./middleware/errorhandle");

connectDB();

app.use("/media", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));

// routes
app.use("/movies", moviesRoutes);

// middleware
app.use(notfound);
app.use(errorhandle);

app.listen(process.env.PORT, () => {
  console.log("The app is listening on Port 8000");
});
