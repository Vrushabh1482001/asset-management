const VendorService = require("../service/vendor.service");
const service = new VendorService();
const { celebrate, Joi } = require("celebrate");
const { validation } = require("../helpers/validation");

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetAllVendor = {
  controller: async (req, res) => {
    try {
      const result = await service.getAllVendor();
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

module.exports.GetVendor = {
  controller: async (req, res) => {
    try {
      const result = await service.getVendor(req.query);
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

module.exports.AddVendor = {
  validator: celebrate({ body: validation.AddVendor }),
  controller: async (req, res) => {
    try {
      const result = await service.addVendor(req.body);
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

module.exports.UpdateVendor = {
  validator: celebrate({ body: validation.AddVendor }),
  controller: async (req, res) => {
    try {
      const result = await service.updateVendor(req.query, req.body);
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

module.exports.DeleteVendor = {
  controller: async (req, res) => {
    try {
      const result = await service.deleteVendor(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
