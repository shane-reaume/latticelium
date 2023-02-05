module.exports = app => {
    const jsonsets = require("../controllers/jsonsets.controller.js");

    var router = require("express").Router();

    // Create a new json set
    router.post("/", jsonsets.create);

    // Retrieve all json sets
    router.get("/", jsonsets.findAll);

    // Retrieve all published json sets
    router.get("/published", jsonsets.findAllPublished);

    // Retrieve a single json set with id
    router.get("/:id", jsonsets.findOne);

    // Update a json set with id
    router.put("/:id", jsonsets.update);

    // Delete a json set with id
    router.delete("/:id", jsonsets.delete);

    // Create a new json set
    router.delete("/", jsonsets.deleteAll);

    app.use('/api/jsonsets', router);
};