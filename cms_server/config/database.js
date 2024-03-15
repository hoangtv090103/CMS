const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connect success ${process.env.MONGODB_URL}`)
  } catch (error) {
    console.log("Connect failed ", error);
  }
}

module.exports = { connect };
