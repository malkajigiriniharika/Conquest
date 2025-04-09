const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 }, // Stores the latest quiz score
  time:{type:Number, default:0}
});

module.exports = mongoose.model("User", UserSchema);
