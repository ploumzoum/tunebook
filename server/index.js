const express = require("express")
require("express-async-errors")

// Load configuration
const Config = require("./src/config")

// Connect database
require("mongoose").connect(Config.mongodb.uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// Start up server
const app = express()
app.use(require("cors")({ maxAge: 30 * 60 }))
app.use(require("morgan")("short"))
app.use(express.json({ strict: false}))
app.use(
	express.urlencoded({ extended: false})
)

app.use("/", require("./src/endpoints/tunes"))
app.use("/", function (req, res) {
	res.status(404).json({
		code: "INVALID_ENDPOINT",
		message: "Invalid Request: no handler at this path",
		path: req.baseUrl + req.path,
	})
})

app.listen(Config.listen.port, Config.listen.host)

console.log("Server ready and listening")
