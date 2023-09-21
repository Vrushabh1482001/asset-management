const express = require("express");
const router = express.Router();


/* -------------------------------------------------- Add Person  -------------------------------------------------- */
router.use("/user", require("./user.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
router.use("/vendor", require("./vendor.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
router.use("/company", require("./company.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
router.use("/item", require("./item.routes"));

/* -------------------------------------------------- Add Person  -------------------------------------------------- */
router.use("/order", require("./order.routes"));

module.exports = router;