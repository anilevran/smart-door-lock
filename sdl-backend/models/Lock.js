const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lockSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isLocked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Lock = mongoose.model("Lock", lockSchema);

module.exports = Lock;
