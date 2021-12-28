const mongoose = require("mongoose");
const uuid = require("uuid").v4;
const GFSFile = require("./file"
  )
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
    files: [
      {
        type: String,
        ref: GFSFile,
      },
    ],
  },
  { timestamps: true }
);

TuneSchema.methods.getFileStream = function (fileId) {
  return mongoose.bucket.tuneFiles.openDownloadStream(fileId);
};

TuneSchema.methods.getFileById = async function (fileId) {
  return await GFSFile.findById(fileId);
};

TuneSchema.methods.addFile = async function (data) {
  const fileId = uuid();
  const options = {
    metadata: {
      encoding: data.encoding,
      mimetype: data.mimetype,
    },
  };
  data.file.pipe(
    mongoose.bucket.tuneFiles.openUploadStreamWithId(
      fileId,
      data.filename,
      options
    )
  );
  let file = null;
  while (!file) {
    await new Promise((r) => setTimeout(r, 500));
    file = await this.getFileById(fileId);
  }
  const length = this.files.push(fileId);
  return this.files[length - 1];
};

TuneSchema.methods.deleteFileById = async function (fileId) {
  this.files.splice(this.files.indexOf(fileId), 1);
  await mongoose.bucket.tuneFiles.delete(fileId);
};

module.exports = mongoose.model("Tune", TuneSchema);
