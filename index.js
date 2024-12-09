const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoute = require("./routes/productsRoute");
const userRoute = require("./routes/userRoutes");
const adminRoute = require('./routes/adminRoute');
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
mongoose
  .connect("mongodb+srv://niyas75tk:KdgaJIf2gbei5mqn@cluster0.edtkkwg.mongodb.net/petshop")
  .then(() => console.log("connected  to mongodb"))
  .catch(() => console.log("error while conecting to mongodb"));
app.use(express.json());
app.use(userRoute);
app.use(adminRoute);

app.use(productRoute);
app.use(errorHandler)

app.listen(5000, (e) => {
  if (e) {
    console.log(`An error occured during server creation :${e}`);
  } else {
    console.log("server listening  to  port ");
  }
});
