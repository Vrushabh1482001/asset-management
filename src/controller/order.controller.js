const OrderService = require("../service/order.service");
const service = new OrderService();
const { celebrate, Joi } = require("celebrate");
const { validation } = require("../helpers/validation");

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetAllOrder = {
  controller: async (req, res) => {
    try {
      const result = await service.getAllOrder(req.query);
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

module.exports.GetOrder = {
  controller: async (req, res) => {
    try {
      const result = await service.getOrder(req.query);
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

module.exports.AddOrder = {
  validator: celebrate({ body: validation.AddOrder }),
  controller: async (req, res) => {
    try {
      const result = await service.addOrder(req.body);
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

module.exports.waWithConformOrder = {
  controller: async (req, res) => {
    try {
      const result = await service.waWithConformOrder(req.query);
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

module.exports.ConformOrder = {
  controller: async (req, res) => {
    try {
      const result = await service.conformOrder(req.query);
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

module.exports.UpdateOrder = {
  validator: celebrate({ body: validation.AddOrder }),
  controller: async (req, res) => {
    try {
      const result = await service.updateOrder(req.query, req.body);
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

module.exports.DeleteOrder = {
  controller: async (req, res) => {
    try {
      const result = await service.deleteOrder(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
