const express = require("express");
const mongoose = require("mongoose");

const productRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoutes");
const adminRoute = require('./routes/adminRoute')
const app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/project")
  .then(() => console.log("connected  to mongodb"))
  .catch(() => console.log("error while conecting to mongodb"));
app.use(express.json());
app.use(productRoute);
app.use(userRoute);
app.use(adminRoute)
app.listen(5000, (e) => {
  if (e) {
    console.log(`An error occured during server creation :${e}`);
  } else {
    console.log("server listening  to  port ");
  }
});
