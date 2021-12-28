const mongoose = require("mongoose");
const uuid = require("uuid").v4;

const TuneSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid,
    },
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    abc: {
      type: String,
    },
    key: {
      type: String,
    },
    composer: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tune", TuneSchema);
