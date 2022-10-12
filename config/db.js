//mongoose
const mongoose = require("mongoose");
require('dotenv').config();
const connectedDB = async () => {
  try {
  //used local db 
    await mongoose.connect(process.env.MONGO_URI);
    console.log("your database is being connected");
  } catch (e) {
    console.log("error");
  }
};

module.exports = connectedDB;
