const { MSG } = require("../helpers/message");
const { errorResponse, successResponse } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
const VendorModel = require("../models/vendor.model");

module.exports = class VENDOR {
  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getAllVendor() {
    try {
      const vendorList = await VendorModel.find({ isDelete: false }).sort({
        createdAt: 1,
      });
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.FOUND_SUCCESS,
        vendorList
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getVendor(query) {
    try {
      const vendor = await VendorModel.findById(query.id);
      return successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, vendor);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async addVendor(body) {
    try {
      let vendor = await VendorModel.findOne({
        mobile: body.mobile,
      });

      if (vendor && vendor?.isDelete == false)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.ALREADY_USER_EXIST
        );

      if (vendor && vendor?.isDelete == true) {
        vendor = await UserModel.findByIdAndUpdate(
          vendor._id,
          { ...body, isDelete: false },
          { new: true }
        );
        return successResponse(
          StatusCodes.OK,
          false,
          MSG.CREATE_SUCCESS,
          vendor
        );
      }

      vendor = await VendorModel.create(body);
      return successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, vendor);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async updateVendor(query, body) {
    try {
      let vendor = await VendorModel.findById(query.id);

      if (!vendor)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      vendor = await VendorModel.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      return successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, vendor);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async deleteVendor(query) {
    try {
      let vendor = await VendorModel.findById(query.id);

      if (!vendor)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      vendor = await VendorModel.findByIdAndUpdate(
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
