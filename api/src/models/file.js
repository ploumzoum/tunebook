const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
    },
    length: {
      type: Number,
      alias: "size",
    },
    chunkSize: Number,
    uploadDate: Date,
    filename: String,
    md5: String,
    metadata: new mongoose.Schema(
      {
        encoding: String,
        mimetype: String,
      },
      { _id: false }
    ),
  },
  { strict: false, toJSON: { virtuals: true } }
);

FileSchema.virtual("url").get(function () {
  return `${Config.apiUrl}/tunes/${this.parent().id}/files/${this._id}`;
});

const GFSFile = new mongoose.model("GFSFile", FileSchema, "tuneFiles.files");

module.exports = GFSFile
