const Product = require("./models/Product")

const getProducts = async () => {
   //возвращает все продукты
   return Product.find({})
}

module.exports = getProducts
