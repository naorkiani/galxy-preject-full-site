const express = require("express");
const router = express.Router();
const userValid = require("../../../validation/userValidation");
const userModel = require("../../../model/userModel");
const bcrypt = require("../../../config/bcrypt");
const jwt = require("../../../config/jwt");

router.post("/", async (req, res) => {
  try {
    const value = await userValid.loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    const userArr = await userModel.findUserByEmail(value.email);
    console.log("--fromPostmen-value-", value);
    if (userArr.length != 0) {
      console.log("--from data-arr-:", userArr);
      const isPassOk = await bcrypt.compareHash(
        value.password,
        userArr[0].password
      );

      if (isPassOk) {
        console.log("comparHash is ok", isPassOk);
        const token = await jwt.createToken({
          id: userArr[0].id,
          email: userArr[0].email,
        });
        console.log(token);
        res.json({
          status: 200,
          msg: `email and password is ok welcome back ${userArr[0].userName}`,
          token: token,
        });
      } else {
        throw "password wrong";
      }
    } else {
      throw "this is email is not found";
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
});
module.exports = router;
