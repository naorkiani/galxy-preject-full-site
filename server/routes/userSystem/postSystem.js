const express = require("express");
const router = express.Router();

const newPostRouter = require("./Posts/newPost");
const findPostRouter = require("./Posts/findPost");
const listRouter = require("./Posts/list");

router.use("/new", newPostRouter);
router.use("/find", findPostRouter);
router.use("/list", listRouter);

module.exports = router;
