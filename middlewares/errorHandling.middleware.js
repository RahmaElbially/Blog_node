function errorHandling(err, req, res, next) {
    if (err.cause?.code === 11000) {
        return res.status(400).json({ error: err.message });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ error: `Mongoose Validation Error: ${err.message}` });
    }

    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({ error: "Invalid reference ID, Please provide a correct ObjectId" });
    }

    res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error" });
}

module.exports = errorHandling;