const HTTPErrors = require("http-errors");

module.exports.TuneNotFound = new HTTPErrors.NotFound("Tune not found");
module.exports.TuneFileNotFound = new HTTPErrors.NotFound("Tune file not found");
module.exports.FileTooLarge = new HTTPErrors.PayloadTooLarge(
	'File is to large too be uploaded'
)
