const express = require("express");
const router = express.Router();
const Contact = require("../../../model/ContactModel");
const validCon = require("../../../validation/contact-usValid");
router.post("/", async (req, res) => {
  try {
    const getContact = await validCon.contactSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    console.log(getContact);
    const newContact = new Contact({
      name: getContact.name,
      email: getContact.email,
      subject: getContact.subject,
      message: getContact.message,
    });
    await newContact.save();
    res.json({ status: 200, msg: "ok, succeeded", response: getContact });
  } catch (error) {
    res.send(error).status(400);
  }
});

module.exports = router;
