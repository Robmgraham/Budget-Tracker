var mongoose = require("mongoose");
var db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/serviceWorkerDemo", {
  useNewUrlParser: true
});

var postSeed = [
    {
        name: {
            required: {type:String},
        },
        value: {
            required: {type:String},
        },
        date: {
            default: Date.now   
        }
    }
]

module.exports = postSeed