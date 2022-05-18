const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lockSchema = new Schema(
  {
    name: {
      type: String,
      default: null,
    },
    isLocked: {
      type: Boolean,
      default: null,
    },
    isAttached: {
      type: Boolean,
      default: null,
    },
  },
  { timestamps: true }
);

const Lock = mongoose.model("Lock", lockSchema);

module.exports = Lock;
