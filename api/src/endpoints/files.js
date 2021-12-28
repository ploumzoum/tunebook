const Tune = require("../models/tune");
const TuneSchema = require("../schemas/tune");
const Errors = require("../errors");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/tunes/:tuneId/files/:fileId",
    schema: {
      description: "Get a tune's file by ID",
      params: {
        tuneId: { type: "string" },
        fileId: { type: "string" },
      },
      response: {
        200: {},
      },
    },
    handler: getFileById,
  });

  fastify.route({
    method: "POST",
    url: "/tunes/:tuneId/files/",
    schema: {
      description: "Create and add a new file to a tune by ID",
      params: {
        type: "object",
        properties: {
          tuneId: { type: "string" },
        },
      },
      response: {
        201: TuneSchema.serialization.file,
      },
    },
    handler: createFile,
  });

  // fastify.route({
  //   method: "PATCH",
  //   url: "/tunes/:tuneId/files/:fileId",
  //   schema: {
  //     description: "Update a tune's file by ID",
  //     params: {
  //       type: "object",
  //       properties: {
  //         tuneId: { type: "string" },
  //         fileId: { type: "string" },
  //       },
  //     },
  //     body: TuneSchema.validation.updateFile,
  //     response: {
  //       200: TuneSchema.serialization.file,
  //     },
  //   },
  //   handler: patchFileById,
  // });

  fastify.route({
    method: "DELETE",
    url: "/tunes/:tuneId/files/:fileId",
    schema: {
      description: "Delete a workpiece's file by ID",
      params: {
        tuneId: { type: "string" },
        fileId: { type: "string" },
      },
    },
    handler: deleteFileById,
  });
}

const getFileById = async function (req, res) {
  const tune = await Tune.findById(req.params.tuneId);
  if (!tune) throw Errors.TuneNotFound;

  const file = await tune.getFileById(req.params.fileId);
  if (!file) throw Errors.TuneFileNotFound;

  res.type(file.metadata.mimetype);
  return tune.getFileStream(req.params.fileId);
};

const createFile = async function (req, res) {
  const tune = await Tune.findById(req.params.tuneId);
  if (!tune) throw Errors.TuneNotFound;

  const data = await req.file();

  if (data.file.truncated === true) throw Errors.FileTooLarge;

  const fileId = await tune.addFile(data);
  await tune.save();
  await tune.populate("files").execPopulate();
  res.code(201);
  return tune.files[tune.files.length - 1];
};

// const patchFileById = async function (req, res) {};

const deleteFileById = async function (req, res) {
  const tune = await Tune.findById(req.params.tuneId);
  if (!tune) throw Errors.TuneNotFound;

  if (!tune.files.includes(req.params.fileId)) throw Errors.TuneFileNotFound;
  await tune.deleteFile(req.params.fileId);
  await tune.save();
  res.code(204).send();
};

module.exports = routes;
