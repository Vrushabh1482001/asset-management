const UserService = require("../service/user.service");
const service = new UserService();
const { celebrate, Joi } = require("celebrate");
const { validation } = require("../helpers/validation");

/* --------------------------------------------------  add user  -------------------------------------------------- */

module.exports.GetAllUser = {
  controller: async (req, res) => {
    try {
      const result = await service.getAllUser();
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

module.exports.GetUser = {
  controller: async (req, res) => {
    try {
      const result = await service.getUser(req.query);
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

module.exports.AddUser = {
  validator: celebrate({ body: validation.AddUser }),
  controller: async (req, res) => {
    try {
      const result = await service.addUser(req.body);
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

module.exports.UpdateUser = {
  validator: celebrate({ body: validation.AddUser }),
  controller: async (req, res) => {
    try {
      const result = await service.updateUser(req.query, req.body);
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

module.exports.DeleteUser = {
  controller: async (req, res) => {
    try {
      const result = await service.deleteUser(req.query);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
