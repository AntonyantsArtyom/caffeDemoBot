const Worker = require("./models/Worker")

const findWorkersFromType = async (type) => {
   //найти всех работников нужного типа и вернуть
   //например вернуть всех администраторов
   return await Worker.find({ type })
}

module.exports = findWorkersFromType
