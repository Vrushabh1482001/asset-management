const { MSG } = require("../helpers/message");
const { errorResponse, successResponse } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../models/users");
const { use } = require("../routes/user.routes");
const { query } = require("express");

module.exports = class USER {
  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getAllUser() {
    try {
      const userList = await UserModel.find({ isDelete: false }).sort({
        createdAt: 1,
      });
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.FOUND_SUCCESS,
        userList
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getUser(query) {
    try {
      const user = await UserModel.findById(query.id);
      return successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, user);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async addUser(body) {
    try {
      let user = await UserModel.findOne({
        mobile: body.mobile,
      });

      if (user && user?.isDelete == false)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.ALREADY_USER_EXIST
        );

      if (user && user?.isDelete == true) {
        user = await UserModel.findByIdAndUpdate(
          user._id,
          { ...body, isDelete: false },
          { new: true }
        );
        return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, user);
      }

      user = await UserModel.create(body);
      return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, user);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async updateUser(query, body) {
    try {
      let user = await UserModel.findById(query.id);

      if (!user)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      user = await UserModel.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      return successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, user);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async deleteUser(query) {
    try {
      let user = await UserModel.findById(query.id);

      if (!user)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      user = await UserModel.findByIdAndUpdate(
        query.id,
        { isDelete: true },
        {
          new: true,
        }
      );
      return successResponse(StatusCodes.OK, false, MSG.DELETE_SUCCESS);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
};
