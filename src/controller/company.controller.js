const CompanyService = require("../service/company.service");
const service = new CompanyService();
const { celebrate, Joi } = require("celebrate");
const { validation } = require("../helpers/validation");

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetAllCompany = {
  controller: async (req, res) => {
    try {
      const result = await service.getAllCompany();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetCompany = {
  controller: async (req, res) => {
    try {
      const result = await service.getCompany(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.AddCompany = {
  validator: celebrate({ body: validation.AddCompany }),
  controller: async (req, res) => {
    try {
      const result = await service.addCompany(req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.UpdateCompany = {
  validator: celebrate({ body: validation.AddCompany }),
  controller: async (req, res) => {
    try {
      const result = await service.updateCompany(req.query, req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.DeleteCompany = {
  controller: async (req, res) => {
    try {
      const result = await service.deleteCompany(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
