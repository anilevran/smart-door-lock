const router = require("express").Router();
const User = require("../models/User.js");
const Lock = require("../models/Lock.js");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const verify = require("./verifyToken");

router.post("/signin", async (req, res) => {
  //Is Form Valid
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Is Email Exist In Database
  const userTemp = await User.findOne({ email: req.body.email });
  if (!userTemp) return res.status(400).send("Email Doesn't Exist!!");

  //Compare Passwords
  const validPass = await bcrypt.compare(req.body.password, userTemp.password);
  if (!validPass) return res.status(400).send("Invalid password!!");

  //JWT
  const token = jwt.sign({ _id: userTemp._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

router.post("/signup", async (req, res) => {
  //Is Form Valid
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Is Email Exist In Database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email Already Exist!!");

  //Hashed Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Save User to Database
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    //JWT
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send({ token: token, user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
