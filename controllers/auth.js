const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const User = require("../models/user");

const register = async (req, res) => {
  // console.log(process.env.JWT_SECRET);
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: user.name, token: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthenticatedError("user doesn't exist");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("password is incorrect");
  }

  // if (password !== user.password) {
  //   throw new UnauthenticatedError("password is incorrect");
  // }

  // create the token for this user
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ userName: user.name, token: token });
};

module.exports = { register, login };
