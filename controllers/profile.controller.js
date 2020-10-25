const db = require('../models')
const Profile = db.profile;

exports.register = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.age || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Profile instance
    const profile = new Profile({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });
    profile.password = profile.generateHash(req.body.password);

    // Save Profile in the database
    profile
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the profile."
            });
        });
};

exports.findAll = (req, res) => {
    Profile
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

exports.login = (req, res) => {
    Profile
        .findOne({ email: req.body.email })
        .then(profile => {
            
            if (!profile) {
                return res.status(404).send({
                    message: "Profile not found!"
                });
            }

            if (!profile.validatePassword(req.body.password)) {
                res.status(400).send({
                    message: "Invalid password."
                });
            } else {
                res.status(200).send({
                    message: "Authenticated login!"
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while trying authenticate."
            });
        });
};