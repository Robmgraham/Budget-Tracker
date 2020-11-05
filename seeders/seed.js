var mongoose = require("mongoose");
var Transaction = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
  useNewUrlParser: true
});

var postSeed = [
    {
        name: "budget",
        value:  "",
        date: {
            default: Date.now   
        }
    }
]
Transaction.insertMany(body)
.then(dbTransaction => {
  res.json(dbTransaction);
})
.catch(err => {
  res.status(404).json(err);
});
 