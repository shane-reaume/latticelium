const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.jsonsets_url;
console.log(`connecting to ${db.url}`)
db.jsonsets = require("./jsonsets.model.js")(mongoose);

module.exports = db;