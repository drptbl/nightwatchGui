var express = require('express');
var path = require('path');
var getEnvironments = require('./api/getEnvironments.js');
var getDir = require('./api/getDir.js');
var startTest = require('./api/startTest');
var config = require('./config.js');

module.exports = function (app) {

    app.use('/', express.static(path.join(__dirname, 'public')));

    app.get('/environments', function (req, res) {
        getEnvironments(config.startingFolder, function (err, data) {
            res.send(data);
        });
    });
    
    app.get('/features', function (req, res) {
        getDir(path.join(config.startingFolder, 'features'), function (err, data) {
            res.send(data);   
        });
    });
    
    app.post('/launchspy', function (req, res) {
        //res.end();
        startTest(req.body, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(data);
            }
        });
    });
    
};