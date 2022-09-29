const express = require("express");
const router = express.Router();
const { userModel } = require("../../model/userModel");

const middleWareRouter = require("../../meddelware/authMiddlewere");
const registerRouter = require("./users/register");
const loginRouter = require("../userSystem/users/login");
const findRouter = require("../userSystem/users/find");
const contact = require("../userSystem/users/contact");

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/find", middleWareRouter, findRouter);
router.use("/contact", contact);

module.exports = router;
