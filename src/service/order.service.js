const { MSG } = require("../helpers/message");
const { errorResponse, successResponse } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
const OrderModel = require("../models/order.model");
const { default: mongoose } = require("mongoose");



module.exports = class ORDER {
  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getAllOrder(query) {
    try {

      let search = "search" in query && query?.search.trim() !== "" ? [{
        $match: {
          $or: [{
            "vendorId.vendorName": query.search.trim().replace(/\s+/g, " ")
          },
          {
            "itemId.itemName": query.search.trim().replace(/\s+/g, " ")
          },
          {
            "companyId.companyName": query.search.trim().replace(/\s+/g, " ")
          },
          {
            "user.userName": query.search.trim().replace(/\s+/g, " ")
          }]
        }
      }] : [];

      let notConform = await "isConform" in query && query?.isConform.trim == "false" ? [
        {
          $match: {
            isConform: false
          }
        }
      ] : [];
      let conform = await "isConform" in query && query?.isConform.trim == "true" ? [
        {
          $match: {
            isConform: true
          }
        }
      ] : [];
      const OrderList = await OrderModel.aggregate([
        { $match: { isDelete: false } },
        ...notConform,
        ...conform,
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendorId"
          }
        },
        { $set: { "vendorId": { $first: "$vendorId" } } },
        {
          $lookup: {
            from: "items",
            localField: "itemId",
            foreignField: "_id",
            as: "itemId"
          }
        },
        { $set: { "itemId": { $first: "$itemId" } } },
        {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "companyId"
          }
        },
        { $set: { "companyId": { $first: "$companyId" } } },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        { $set: { "user": { $first: "$user" } } },
        ...search,
        { $sort: { createdAt: -1 } }
      ])
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.FOUND_SUCCESS,
        OrderList
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getOrder(query) {
    try {
      const Order = await OrderModel.findById(query.id);
      return successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, Order);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async addOrder(body) {
    try {
      body.orderDate = await Date.now();
      let order = await OrderModel.create(body);
      return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, order);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async waWithConformOrder(query) {
    try {
      let order = await OrderModel.updateMany({
        _id: { $in: await Array.isArray(query?.ids) && query?.ids.length > 0 ? [...query.ids.map(ele => new mongoose.Types.ObjectId(ele))] : [new mongoose.Types.ObjectId(query.ids.trim())] }
      },
        {
          isConform: true
        }
      );
      return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, order);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async conformOrder(query) {
    try {
      let order = await OrderModel.findById(query.id);

      if (!order)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      order = await OrderModel.findByIdAndUpdate(query.id, { receivedDate: await Date.now(), isReceived: await true }, {
        new: true,
      });
      return successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, order);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async updateOrder(query, body) {
    try {
      let order = await OrderModel.findById(query.id);

      if (!order)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );
      body.orderDate = await Date.now();
      order = await OrderModel.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      return successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, order);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async deleteOrder(query) {
    try {
      let order = await OrderModel.findById(query.id);

      if (!order)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      order = await OrderModel.findByIdAndUpdate(
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
