const { MSG } = require("../helpers/message");
const { errorResponse, successResponse } = require("../helpers/response");
const { StatusCodes } = require("http-status-codes");
const CompanyModel = require("../models/company.model");

module.exports = class COMPANY {
  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getAllCompany() {
    try {
      const companyList = await CompanyModel.find({ isDelete: false }).sort({
        createdAt: 1,
      });
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.FOUND_SUCCESS,
        companyList
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async getCompany(query) {
    try {
      const company = await CompanyModel.findById(query.id);
      return successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, company);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async addCompany(body) {
    try {
      let company = await CompanyModel.findOne({
        companyName: body.companyName,
        isDelete: false,
      });

      if (company)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.ALREADY_USER_EXIST
        );

      company = await CompanyModel.create(body);
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.CREATE_SUCCESS,
        company
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async updateCompany(query, body) {
    try {
      let company = await CompanyModel.findById(query.id);

      if (!company)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      company = await CompanyModel.findByIdAndUpdate(query.id, body, {
        new: true,
      });
      return successResponse(
        StatusCodes.OK,
        false,
        MSG.UPDATE_SUCCESS,
        company
      );
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  /* --------------------------------------------------  getAllLocation  -------------------------------------------------- */
  async deleteCompany(query) {
    try {
      let company = await CompanyModel.findById(query.id);

      if (!company)
        return errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.NOT_FOUND
        );

      company = await CompanyModel.findByIdAndUpdate(
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
