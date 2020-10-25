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