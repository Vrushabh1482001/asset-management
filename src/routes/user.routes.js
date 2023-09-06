const express = require("express");
const router = express.Router();
const {
  AddUser,
  UpdateUser,
  GetAllUser,
  GetUser,
  DeleteUser,
} = require("../controller/user.controller");

router.use(express.json());
router.use(express.urlencoded());

/* --------------------------------------------------  getall person  -------------------------------------------------- */
router.get("/get-all-user", GetAllUser.controller);

/* -------------------------------------------------- get person  -------------------------------------------------- */
router.get("/get-user", GetUser.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/add-user", AddUser.validator, AddUser.controller);

/* --------------------------------------------------  update person  -------------------------------------------------- */
router.put("/update-user", UpdateUser.validator, UpdateUser.controller);

/* -------------------------------------------------- delete person  -------------------------------------------------- */
router.delete("/delete-user", DeleteUser.controller);

module.exports = router;
