const db = require('../models')
const Position = db.position;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.profile || !req.body.coordinates) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Position instance
    const position = new Position({
        profile: req.body.profile,
        location: {
            type: 'Point',
            coordinates: req.body.coordinates
        }
    });

    // Save Position in the database
    position
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the position."
            });
        });
};

exports.findAll = (req, res) => {
    Position
        .find({})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving profiles."
            });
        });
};