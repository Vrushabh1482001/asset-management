const ItemService = require("../service/item.service");
const service = new ItemService();
const { celebrate, Joi } = require("celebrate");
const { validation } = require("../helpers/validation");

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetAllItem = {
  controller: async (req, res) => {
    try {
      const result = await service.getAllItem();
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

module.exports.GetItem = {
  controller: async (req, res) => {
    try {
      const result = await service.getItem(req.query);
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

module.exports.AddItem = {
  validator: celebrate({ body: validation.AddItem }),
  controller: async (req, res) => {
    try {
      const result = await service.addItem(req.body);
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

module.exports.UpdateItem = {
  validator: celebrate({ body: validation.AddItem }),
  controller: async (req, res) => {
    try {
      const result = await service.updateItem(req.query, req.body);
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

module.exports.DeleteItem = {
  controller: async (req, res) => {
    try {
      const result = await service.deleteItem(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
