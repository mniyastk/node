const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/userSchema");
require("dotenv").config();

/// User Registration controller ///
///add error class
///ty cath midde ware


async function userRegister(req, res) {
  const { name, username, password, email } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(401).send("user already exists with this email");
    } else {
      const encPass = await bcrypt.hash(password, 10);

      const user = await Users.create({
        name,
        username,
        email,
        password: encPass,
      });
      res.status(201).json({ status: "success" ,data:user});
    }
  } catch (e) {
    res.status(400).json(e);
  }
}

/// User Login Controller ///

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      user.token = token;

      res.status(200).send(token);
    } else {
      res.status(401).send("Incorrect username or password");
    }
  } catch (e) {
    res.status(401).send(`User does not exist: ${e}`);
  }
}

module.exports = { userRegister, loginUser };
