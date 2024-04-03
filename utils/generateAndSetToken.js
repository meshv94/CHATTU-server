const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const generateAndSetToken = (req, res, id) => {
  // jwt token
  const token = jwt.sign({ id }, process.env.JWT_TOKEN);
  // console.log("token at generateToken function", token);
  // setting token for auth user
  // res.cookie("jwt", token, { httpOnly: true });
  // console.log('cooikie ' , req.cookies.jwt);
  return token;
};

module.exports = generateAndSetToken;
