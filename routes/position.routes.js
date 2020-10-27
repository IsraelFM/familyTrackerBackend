module.exports = app => {
    const position = require('../controllers/position.controller');
    let router = require('express').Router();

    router.post('/', position.create);
    
    router.get('/', position.findAll);

    app.use('/position', router);

};