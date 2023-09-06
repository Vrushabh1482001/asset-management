const express = require("express");
const router = express.Router();
const {
  GetAllCompany,
  GetCompany,
  AddCompany,
  UpdateCompany,
  DeleteCompany,
} = require("../controller/company.controller");

router.use(express.json());
router.use(express.urlencoded());

/* --------------------------------------------------  getall person  -------------------------------------------------- */
router.get("/get-all-company", GetAllCompany.controller);

/* -------------------------------------------------- get person  -------------------------------------------------- */
router.get("/get-company", GetCompany.controller);

/* --------------------------------------------------  add person  -------------------------------------------------- */
router.post("/add-company", AddCompany.validator, AddCompany.controller);

/* --------------------------------------------------  update person  -------------------------------------------------- */
router.put(
  "/update-company",
  UpdateCompany.validator,
  UpdateCompany.controller
);

/* -------------------------------------------------- delete person  -------------------------------------------------- */
router.delete("/delete-company", DeleteCompany.controller);

module.exports = router;
