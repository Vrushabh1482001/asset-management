const express = require("express");
const router = express.Router();
const {
  GetAllItem,
  GetItem,
  AddItem,
  UpdateItem,
  DeleteItem,
} = require("../controller/item.controller");

router.use(express.json());
router.use(express.urlencoded());

/* --------------------------------------------------  getall person  -------------------------------------------------- */
router.get("/get-all-item", GetAllItem.controller);

/* -------------------------------------------------- get person  -------------------------------------------------- */
router.get("/get-item", GetItem.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/add-item", AddItem.validator, AddItem.controller);

/* --------------------------------------------------  update person  -------------------------------------------------- */
router.put("/update-item", UpdateItem.validator, UpdateItem.controller);

/* -------------------------------------------------- delete person  -------------------------------------------------- */
router.delete("/delete-item", DeleteItem.controller);

module.exports = router;
