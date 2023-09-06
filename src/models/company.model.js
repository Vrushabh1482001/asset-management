const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    companyMoNo: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("companies", CompanySchema);
