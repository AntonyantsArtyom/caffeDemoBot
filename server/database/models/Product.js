const { Schema, default: mongoose } = require("mongoose")

const Product = new Schema({
   id: { type: String, unique: true, require: true },
   image: { type: String },
   name: { type: String },
   description: { type: String },
   price: { type: Number },
})

module.exports = mongoose.model("Product", Product, "products")
