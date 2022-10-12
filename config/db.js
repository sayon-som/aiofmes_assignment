//mongoose
const mongoose = require("mongoose");

const connectedDB = async () => {
  try {
  
    await mongoose.connect("mongodb://localhost:27017/Blog_new_Db");
    console.log("your database is being connected");
  } catch (e) {
    console.log("error");
  }
};

module.exports = connectedDB;
