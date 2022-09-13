const express = require("express");
const router = express.Router();
const userValid = require("../../../validation/userValidation");
const bcrypt = require("../../../config/bcrypt");
const userModel = require("./../../../model/userModel");

router.post("/", async (req, res) => {
  try {
    const getNewUser = await userValid.registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    getNewUser.password = await bcrypt.createHash(getNewUser.password);
    const testEmailUser = await userModel.findUserByEmail(getNewUser.email);
    if (testEmailUser.length != 0) {
      throw "This email is already exists";
    } else {
      await userModel.createUser(
        getNewUser.userName,
        getNewUser.email,
        getNewUser.password
      );
    }
    console.log(getNewUser);
    res.json({
      status: 200,
      msg: "ok, succeeded",
      Response: getNewUser,
    });
  } catch (err) {
    res.status(400).json({ status: 400, msg: "Error getting information" });
  }
});

module.exports = router;
