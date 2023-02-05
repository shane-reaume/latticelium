const db = require("../models");
const Jsonsets = db.jsonsets;

/**
 * Create and Save a new json-set
 * @param req
 * @param res
 */
exports.create = (req, res) => {

};

// Retrieve all json-sets from the database.
exports.findAll = (req, res) => {

};

// Find a single json-set with an id
exports.findOne = (req, res) => {

};

/**
 * Update a json-set by the id in the request
 * @param req
 * @param res
 */
exports.update = (req, res) => {

};

/**
 * Delete a json-set with the specified id in the request
 * @param req
 * @param res
 */
exports.delete = (req, res) => {

};

/**
 * Delete all json-sets from the database.
 * @param req
 * @param res
 */
exports.deleteAll = (req, res) => {

};

/**
 * Find all published json-sets
 * @param req
 * @param res
 */
exports.findAllPublished = (req, res) => {

};

/**
 *
 * @param req
 * @param res
 */
exports.create = (req, res) => {

    /**
     * Validate request
     */
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    /**
     * Create a json-set
     */
    const jsonsets = new Jsonsets({
        title: req.body.title,
        description: req.body.description,
        data: req.body.data,
        published: req.body.published ? req.body.published : false
    });

    /**
     * Save json-set in the database
      */
    jsonsets
        .save(jsonsets)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the json set."
            });
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Jsonsets.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving json-sets."
            });
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.findOne = (req, res) => {
    const id = req.params.id;

    Jsonsets.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Jsonsets with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Jsonsets with id=" + id });
        });
};

/**
 *
 * @param req
 * @param res
 * @returns {*}
 */
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Jsonsets.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Jsonsets with id=${id}. Maybe Jsonsets was not found!`
                });
            } else res.send({ message: "Jsonsets was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Jsonsets with id=" + id
            });
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    const id = req.params.id;

    Jsonsets.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Jsonsets with id=${id}. Maybe Jsonsets was not found!`
                });
            } else {
                res.send({
                    message: "Jsonsets was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Jsonsets with id=" + id
            });
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.deleteAll = (req, res) => {
    Jsonsets.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Jsonsets were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Jsonsets."
            });
        });
};

/**
 *
 * @param req
 * @param res
 */
exports.findAllPublished = (req, res) => {
    Jsonsets.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Jsonsets."
            });
        });
};

