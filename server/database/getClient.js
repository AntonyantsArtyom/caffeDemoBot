const User = require("./models/User")

const getUser = async (id) => {
   //возвращает пользователя по его id
   return await User.findOne({ id })
}

module.exports = getUser
