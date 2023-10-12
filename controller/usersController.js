const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");
const asyncErrorHandler = require("../helpers/asyncErrorHandler");
const ErrorClass = require("../helpers/classErrors");
require("dotenv").config();

/// User Registration controller ///
const userRegister = asyncErrorHandler(async function (req, res, next) {
  const { name, username, password, email } = req.body;

  const existingUseByMail = await Users.findOne({ email });
  const existingUserByUsername = await Users.findOne({ username });
  if (existingUseByMail || existingUserByUsername) {
    const errorField = existingUseByMail ? "mail" : "username";
    const err = new ErrorClass(
      `user with same ${errorField} already exists `,
      400
    );
    return next(err);
  } else {
    const encPass = await bcrypt.hash(password, 10);
    const token = jwt.sign(
      {
        username: username,
        email: email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    await Users.create({
      name,
      username,
      email,
      password: encPass,
    });
    res.status(201).json({
      status: "success",
      token: token,
    });
  }
});
/// User Login Controller ///

const loginUser = asyncErrorHandler(async function (req, res,next) {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    user.token = token;

    res.status(200).json({
      status: "Success",
      token: token,
    });
  } else {
    const err= new ErrorClass('incorrect username Or password',401)
    return  next(err)
  }
});
module.exports = { userRegister, loginUser };
