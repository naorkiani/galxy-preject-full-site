const express = require("express");
const router = express.Router();
const { userModel } = require("../../model/userModel");

const middleWareRouter = require("../../meddelware/authMiddlewere");
const registerRouter = require("./users/register");
const loginRouter = require("../userSystem/users/login");
const findRouter = require("../userSystem/users/find");

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/find", middleWareRouter, findRouter);

module.exports = router;
