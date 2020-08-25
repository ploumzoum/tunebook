const router = require('express').Router()
const Tune = require("../models/tune")

router.get("/tunes/all", async function(req, res, next){
	const tunes = await Tune.find()
	return res.json(tunes)
})

router.get("/tunes/:tune_id", async function(req, res, next){
	const tune = await Tune.findById(req.params.tune_id)
	return res.json(tune)
})


router.get("/tunes", async function(req, res, next){
	let regex = ""
	if (req.query.search_terms) {
		let search_terms = [req.query.search_terms]
		if (req.query.search_terms.includes(" "))
			search_terms = search_terms.concat(req.query.search_terms.split(" "))
		regex = new RegExp(search_terms.join("|"))
	}

	if (!req.query.limit) req.query.limit = 50
	else req.query.limit = Math.min(req.query.limit, 250)

	const tunes = await Tune.find({
		$or: [
			{ title:    { $regex: regex, $options: "i" } },
			{ type:     { $regex: regex, $options: "i" } },
			{ abc:      { $regex: regex, $options: "i" } },
			{ key:      { $regex: regex, $options: "i" } },
			{ composer: { $regex: regex, $options: "i" } },
		],
	})
		.skip(parseInt(req.query.skip))
		.limit(parseInt(req.query.limit))

	return res.json(tunes)
})

router.post("/tunes", async function(req, res, next){
	const tune = new Tune(req.body)
	await tune.save()
	return res.json(tune)
}) 

router.patch("/tunes/:tune_id", async function(req, res, next){
	const tune = await Tune.findById(req.params.tune_id)
	await tune.update(req.body)
	return res.json(tune)
}) 

router.delete("/tunes/:tune_id", async function(req, res, next){
 	await Tune.deleteOne({_id: req.params.tune_id})
 	res.status(204).end()
})

module.exports = router