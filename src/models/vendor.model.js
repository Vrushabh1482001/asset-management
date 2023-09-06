const mongoose = require("mongoose");

const VendorSchema = mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: true,
    },
    mobile: {
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

module.exports = mongoose.model("vendors", VendorSchema);
