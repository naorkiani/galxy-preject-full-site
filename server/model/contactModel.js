const mongoose = require("mongoose");

const contactModelSchema = new mongoose.Schema({
  name: { type: String, minlength: 2, required: true },
  email: { type: String, required: true, lowercase: true },
  subject: { type: String, minlength: 2, required: true },
  message: { type: String, minlength: 2, required: true },
});

const Contact = mongoose.model("contact", contactModelSchema);

module.exports = Contact;
