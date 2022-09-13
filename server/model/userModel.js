const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
});
const User = mongoose.model("schemaUser", userSchema);

const createUser = (userName, email, password, isAdmin, createdAt) => {
  const newUser = new User({ userName, email, password, isAdmin, createdAt });
  return newUser.save();
};
const findUserByEmail = (email) => {
  return User.find({ email: email });
};
const findUserById = (id) => {
  return User.findById(id);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
