const findWorkersFromType = require("../database/findWorkersFromType")

const checkAcess = async (ctx, next) => {
   const id = String(ctx.message.from.id)
   if (ctx.message.text == "/start officiant" || ctx.message.text == "/start_officiant") {
      let officiants = await findWorkersFromType("officiant")
      officiants = officiants.map((worker) => worker.id)
      if (officiants.includes(id)) return next()
      else return ctx.reply("тебя нет в списке доступа для этого режима")
   }
   if (ctx.message.text == "/start_administrator") {
      let administrators = await findWorkersFromType("administrator")
      administrators = officiants.map((worker) => worker.id)
      if (administrators.includes(id)) return next()
      else return ctx.reply("тебя нет в списке доступа для этого режима")
   }
   next()
}

module.exports = checkAcess
