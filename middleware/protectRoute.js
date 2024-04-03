const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.body.jwt;
    console.log(token)
    if (!token) return res.status(400).send({ msg: " unauthorized token not found" })

    const isValid = jwt.verify(token, process.env.JWT_TOKEN);

    if (isValid) {
      const user = await UserModel.findById(isValid.id).select(["-password"]);
      if (!user) return res.status(401).send({ msg: "User not found" });
      req.user = user;
      console.log(user)
      next();
    } else {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = protectRoute;