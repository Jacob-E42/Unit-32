const express = require("express");
const ExpressError = require("./expressError");
const router = express.Router();
const items = require("./fakeDb");

router.get("/", function (req, res, next) {
	if (!items) throw new ExpressError("Not found", 404);
	return res.send(items);
});

router.post("/", function (req, res, next) {
	try {
		if (!req.body.name || !req.body.price) throw new ExpressError("Must include both name and price", 400);
		let item = { name: req.body.name, price: req.body.price };
		items.push(item);
		return res.status(201).json({ added: { item } });
	} catch (e) {
		return next(e);
	}
});

router.patch("/:name", function (req, res, next) {
	try {
		if (!req.body.name || !req.body.price) throw new ExpressError("Must include both name and price", 400);
		let item = items.find((el) => el.name === req.params.name);

		item.name = req.body.name;
		item.price = req.body.price;

		return res.json({ updated: item });
	} catch (e) {
		return next(e);
	}
});

router.delete("/:name", function (req, res, next) {
	try {
		if (!req.params.name) throw new ExpressError("Must include name.", 400);
		let foundIndex = items.findIndex((el) => el.name === req.params.name);
		items.splice(foundIndex, 1);

		return res.json({ message: "deleted" });
	} catch (e) {
		return next(e);
	}
});

module.exports = router;
