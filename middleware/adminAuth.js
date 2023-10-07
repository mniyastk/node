const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  /// Grab token from headers
  const token = req.headers.authorization;
  if (!token) {
    res.status(403).send("token required");
  }
  /// Decode the token
  try {
    const tokenValue = token.split(" ")[1];
    const decrypt = jwt.verify(tokenValue, process.env.ADMIN_SECRET);
    console.log(decrypt);
    req.user=decrypt
  } catch (error) {
    console.log(error);
    res.status(401).send("invalid token")
  }

  next();
};
module.exports = auth;
