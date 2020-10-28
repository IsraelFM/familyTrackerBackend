const db = require('../models')
const Family = db.family;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.surname) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Family instance
    const family = new Family({
        surname: req.body.surname
    });

    // Save Family in the database
    family
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the family."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Family
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found Family with id " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving Family with id=" + id
            });
        });
};

exports.findAll = (req, res) => {
    Family
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving families."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
        return;
    }

    const id = req.params.id;

    Family
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Family with id=${id}. Maybe Family was not found!`
                });
            } else {
                res.send({
                    message: "Family was updated successfully."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating Family with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Family
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Family with id=${id}. Maybe Family was not found!`
                });
            } else {
                res.send({
                    message: "Family was deleted successfully!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Could not delete Family with id=" + id
            });
        });
};