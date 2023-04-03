const express = require("express");

const blogsRoutes = require("./routes/blogsRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/testRoute");
const uploadRoutes = require("./routes/uploadRoutes");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./middlewares/auth");
require("./models/index");
const app = express();
// for parsing JSON data
// app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://lifeofabblogs.onrender.com/"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(passport.initialize());

app.use("/api/payment", paymentRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/extra", userRoutes);
// app.use("/uploads", express.static("./uploads"));
// app.use("/api/upload", uploadRoutes);
app.get("/", (req, res) => {
  res.send("API is running ......");
});
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
