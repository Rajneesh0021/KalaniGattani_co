const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const {MONGODB_URI,PORT}=process.env;


// routes
const userRoutes = require("./routes/user.route");
const serviceRoutes =require('./routes/services.route')
const servicegroupRoutes =require('./routes/servicesgroup.route')
// init express app
const app = express();

app.use(express.json());
app.use(
  cors()
);



app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

// routes middlewares

app.use("/api/user", userRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/servicegroup", servicegroupRoutes);



async function main() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("database connected");
    app.listen(PORT ||5000, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
