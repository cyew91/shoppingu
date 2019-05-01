'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var _ = require('lodash');
var config = require('./config');
var winston = require('./winston');
var db = {};


winston.info('Initializing Sequelize...');

var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    storage: config.db.storage,
    logging: config.enableSequelizeLog === 'true' ? winston.verbose : false,
    dialectOptions: {
        multipleStatements: true
    }
});

var initData = fs.readFileSync(config.databaseDir + '/initialData.sql', "utf8");

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    // import model files and save model names
    .forEach(function (file) {
        winston.info('Loading model file ' + file);
        var model = sequelize.import(path.join(config.modelsDir, file));
        db[model.name] = model;
    });

// loop through initial data file in database directory and insert all intial data
function loadInitData (data) {
    sequelize.query(data).spread(function(result, metadata) {
        winston.info('Total row(s) affected: ' + metadata);
    });
}

// If data already exist in profile table, no need to load initial data
function isInitDataExist () {
    sequelize.query('SELECT * FROM profile', { model: db.profile }).then(function (profile) {
        if (profile.length <= 0) {
            winston.info('Loading initial data');
            loadInitData(initData);
        }
    });
}

// invoke associations on each of the models
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db);
    }
});

// Synchronizing any model changes with database. 
// set FORCE_DB_SYNC=true in the environment, or the program parameters to drop the database,
//   and force model changes into it, if required;
// Caution: Do not set FORCE_DB_SYNC to true for every run to avoid losing data with restarts
sequelize
    .sync({
        force: config.FORCE_DB_SYNC === 'true',
        logging: config.enableSequelizeLog === 'true' ? winston.verbose : false
    })
    .then(function () {
        isInitDataExist();
        winston.info("Database " + (config.FORCE_DB_SYNC === 'true' ? "*DROPPED* and " : "") + "synchronized");
    }).catch(function (err) {
        winston.error("An error occurred: ", err);
    });

// assign the sequelize variables to the db object and returning the db. 
module.exports = _.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);