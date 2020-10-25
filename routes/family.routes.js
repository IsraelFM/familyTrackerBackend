module.exports = app => {
    const family = require('../controllers/family.controller');
    let router = require('express').Router();

    router.post('/', family.create);
    
    router.get('/', family.findAll);

    app.use('/family', router);

};