const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lockSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    isAttached: {
      type: Boolean,
      default: false,
    },
    connected_wifi_ssid: {
      type: String,
      default: "",
    },
    connected_wifi_password: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Lock = mongoose.model("Lock", lockSchema);

module.exports = Lock;
