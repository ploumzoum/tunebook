const HTTPErrors = require("http-errors");

module.exports.TuneNotFound = new HTTPErrors.NotFound("Tune not found");
