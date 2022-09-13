const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  flight: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  addressLaunch: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 14,
  },
  image: {
    url: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 2, maxlength: 256 },
  },

  Flightdate: {
    type: Date,
    required: true,
    default: Date.now,
  },

  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  user_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
