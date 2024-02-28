const mongoose = require("mongoose");

const towerSchema = new mongoose.Schema({
    towerName: {
    type: String,
    required: true,
    },
    createdById: {
    type: Number,
    required: true,
    },
    position: {
    type: Number,
    required: true,
    },
  
});

const tower = mongoose.model("tower", towerSchema);

module.exports = tower;
