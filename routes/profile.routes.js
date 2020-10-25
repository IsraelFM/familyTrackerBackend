module.exports = app => {
    const profile = require('../controllers/profile.controller');
    let router = require('express').Router();

    router.post('/register', profile.register);
    
    router.post('/login', profile.login);

    router.get('/', profile.findAll);

    app.use('/profile', router);

};