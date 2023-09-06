const express = require("express");
const router = express.Router();
const {
  GetAllOrder, GetOrder, AddOrder, waWithConformOrder, ConformOrder, UpdateOrder, DeleteOrder
} = require("../controller/order.controller");

router.use(express.json());
router.use(express.urlencoded());

/* --------------------------------------------------  getall person  -------------------------------------------------- */
router.get("/get-all-order", GetAllOrder.controller);

/* -------------------------------------------------- get person  -------------------------------------------------- */
router.get("/get-order", GetOrder.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/add-order", AddOrder.validator, AddOrder.controller);
/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/wa-conform-order", waWithConformOrder.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/conform-order", ConformOrder.controller);

/* --------------------------------------------------  update person  -------------------------------------------------- */
router.put(
  "/update-order",
  UpdateOrder.validator,
  UpdateOrder.controller
);

/* -------------------------------------------------- delete person  -------------------------------------------------- */
router.delete("/delete-order", DeleteOrder.controller);

module.exports = router;
