const express = require("express");
const router = express.Router();
const {
  GetAllVendor,
  GetVendor,
  AddVendor,
  UpdateVendor,
  DeleteVendor,
} = require("../controller/vendor.controller");

router.use(express.json());
router.use(express.urlencoded());

/* --------------------------------------------------  getall person  -------------------------------------------------- */
router.get("/get-all-vendor", GetAllVendor.controller);

/* -------------------------------------------------- get person  -------------------------------------------------- */
router.get("/get-vendor", GetVendor.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/add-vendor", AddVendor.validator, AddVendor.controller);

/* --------------------------------------------------  update person  -------------------------------------------------- */
router.put("/update-vendor", UpdateVendor.validator, UpdateVendor.controller);

/* -------------------------------------------------- delete person  -------------------------------------------------- */
router.delete("/delete-vendor", DeleteVendor.controller);

module.exports = router;
