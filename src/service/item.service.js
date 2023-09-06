const { MSG } = require("../helpers/message");
const { errorResponse, successResponse } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
const ItemModel = require("../models/item.model");

module.exports = class COMPANY {
  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getAllItem() {
    try {
      const itemList = await ItemModel.find({ isDelete: false }).sort({
        itemName: 1,
      });
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.FOUND_SUCCESS,
        itemList
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getItem(query) {
    try {
      const item = await ItemModel.findById(query.id);
      return successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, item);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async addItem(body) {
    try {
      let item = await ItemModel.findOne({
        itemName: body.itemName,
        isDelete: false,
      });

      if (item)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.ALREADY_USER_EXIST
        );

      item = await ItemModel.create(body);
      return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, item);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async updateItem(query, body) {
    try {
      let item = await ItemModel.findById(query.id);

      if (!item)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      item = await ItemModel.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      return successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, item);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async deleteItem(query) {
    try {
      let item = await ItemModel.findById(query.id);

      if (!item)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      item = await ItemModel.findByIdAndUpdate(
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
