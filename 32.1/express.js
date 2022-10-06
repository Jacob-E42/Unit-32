const express = require("express");
const ExpressError = require("./error");
const { mean, convertAndValidateNums, median, mode } = require("./helpers");

const app = express();

app.use(express.json());

app.get("/mean", function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError(
            "You must pass a query key of nums with a comma-separated list of numbers.",
            400
        );
    }

    const stringNums = req.query.nums.split(",");
    const nums = convertAndValidateNums(stringNums);

    if (nums instanceof Error) throw new ExpressError(nums.message);
    console.log("nums: ", nums);

    return res.json({ operation: "mean", value: mean(nums) });
});

app.get("/median", function (req, res) {
    if (!req.query.nums) {
        throw new ExpressError(
            "You must pass a query key of nums with a comma-separated list of numbers.",
            400
        );
    }
    const stringNums = req.query.nums.split(",");
    const nums = convertAndValidateNums(stringNums);

    if (nums instanceof Error) throw new ExpressError(nums.message);
    console.log("nums: ", nums);

    return res.json({ operation: "median", value: median(nums) });
});

app.get("/mode", function (req, res) {
    if (!req.query.nums) {
        throw new ExpressError(
            "You must pass a query key of nums with a comma-separated list of numbers.",
            400
        );
    }

    const stringNums = req.query.nums.split(",");
    const nums = convertAndValidateNums(stringNums);

    if (nums instanceof Error) throw new ExpressError(nums.message);
    console.log("nums: ", nums);

    return res.json({ operation: "mode", value: mode(nums) });
});

app.use((req, res, next) => {
    const NotFoundError = new ExpressError("Not found", 404);
    return next(NotFoundError);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err,
        status: res.status
    });
});

app.listen(3000, function () {
    console.log("App on port 3000");
});
