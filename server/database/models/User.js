const { Schema, default: mongoose } = require("mongoose")

const User = new Schema({
   id: { type: String, unique: true, require: true },
   name: { type: String },
   father: { type: String, default: "None" },
   childrens: [{ type: String }],
   weekPromotion: { type: String },
   friendPromotion: { type: Number },
   cashback: { type: Number },
})

module.exports = mongoose.model("User", User, "users")

//https://mongoosejs.com/docs/validation.html
