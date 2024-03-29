const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError(
      "Authentication invalid, please provide JWT"
    );
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the request
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (err) {
    throw new UnauthenticatedError("Authentication error - token is invalid");
  }
};

module.exports = auth;
