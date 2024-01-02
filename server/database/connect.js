const { default: mongoose } = require("mongoose")

const connect = () => {
   //подключение к базе данных
   mongoose
      .set("strictQuery", false)
      .connect("mongodb://127.0.0.1:27017/caffeBot")
      .then(() => console.log("база данных подключена"))
}

module.exports = connect
