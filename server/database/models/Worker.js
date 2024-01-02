const { Schema, default: mongoose } = require("mongoose")

const Worker = new Schema({
   id: { type: String, unique: true, require: true },
   type: { type: String },
})

module.exports = mongoose.model("Worker", Worker, "workers")
