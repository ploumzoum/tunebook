const Tune = require("../models/tune");
const TuneSchema = require("../schemas/tune");
const Errors = require("../errors");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/tunes/all",
    schema: {
      description: "Get all tunes",
      response: {
        200: { type: "array", items: TuneSchema.serialization.tune },
      },
    },
    handler: getAllTunes,
  });

  fastify.route({
    method: "GET",
    url: "/tunes/:tuneId",
    schema: {
      description: "Get a tune by ID",
      params: {
        tuneId: { type: "string" },
      },
      response: {
        200: TuneSchema.serialization.tune,
      },
    },
    handler: getTuneById,
  });

  fastify.route({
    method: "GET",
    url: "/tunes",
    schema: {
      description: "Get tunes with filters",
      querystring: {
        searchTerms: {
          type: "string",
        },
        limit: {
          type: "integer",
          minimum: 1,
        },
        skip: {
          type: "integer",
          minimum: 0,
        },
      },
      response: {
        200: { type: "array", items: TuneSchema.serialization.tune },
      },
    },
    handler: getTunes,
  });

  fastify.route({
    method: "POST",
    url: "/tunes",
    schema: {
      description: "Create a new tune",
      body: TuneSchema.validation.createTune,
      response: {
        200: TuneSchema.serialization.tune,
      },
    },
    handler: createTune,
  });

  fastify.route({
    method: "PATCH",
    url: "/tunes/:tuneId",
    schema: {
      description: "Patch a tune by ID",
      params: {
        tuneId: { type: "string" },
      },
      body: TuneSchema.validation.createTune,
      response: {
        200: TuneSchema.serialization.tune,
      },
    },
    handler: patchTuneById,
  });

  fastify.route({
    method: "DELETE",
    url: "/tunes/:tuneId",
    schema: {
      description: "Delete a tune by ID",
      params: {
        tuneId: { type: "string" },
      },
      response: {
        204: {},
      },
    },
    handler: deleteTuneById,
  });
}

const getAllTunes = async function (req, res) {
  return await Tune.find();
};

const getTuneById = async function (req, res) {
  const tune = await Tune.findById(req.params.tuneId);
  if (!tune) throw Errors.TuneNotFound;
  return tune;
};

const getTunes = async function (req, res) {
  let regex = "";
  if (req.query.searchTerms) {
    let searchTerms = [req.query.searchTerms];
    if (req.query.searchTerms.includes(" "))
      searchTerms = searchTerms.concat(req.query.searchTerms.split(" "));
    regex = new RegExp(searchTerms.join("|"));
  }

  if (!req.query.limit) req.query.limit = 50;
  else req.query.limit = Math.min(req.query.limit, 250);

  return await Tune.find({
    $or: [
      { title: { $regex: regex, $options: "i" } },
      { type: { $regex: regex, $options: "i" } },
      { abc: { $regex: regex, $options: "i" } },
      { key: { $regex: regex, $options: "i" } },
      { composer: { $regex: regex, $options: "i" } },
    ],
  })
    .skip(parseInt(req.query.skip))
    .limit(parseInt(req.query.limit));
};

const createTune = async function (req, res) {
  const tune = new Tune(req.body);
  return await tune.save();
};

const patchTuneById = async function (req, res) {
  const tune = await findOneAndUpdate({ _id: req.params.tuneId }, req.body, {
    new: true,
  });
  if (!tune) throw Errors.TuneNotFound;
  return tune;
};

const deleteTuneById = async function (req, res) {
  const { deletedCount } = await Tune.deleteOne({
    _id: req.params.tuneId,
  });
  if (deletedCount !== 1) throw Errors.TuneNotFound;
  res.code(204).send();
};

module.exports = routes;
