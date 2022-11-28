require("dotenv").config();
const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(connectionString)
    .then(console.log("connected to the DB..."));
};

module.exports = connectDB;
