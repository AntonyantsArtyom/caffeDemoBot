const refreshUserPromotions = require("../database/refreshUserPromotions")
const User = require("../database/models/User")
const bot = require("../bot")

const refreshPormotions = async () => {
   //получение количества пользователей
   const fullNumber = await User.countDocuments({})

   //пользователи из базы данных берутся определенное количество документов за раз
   //переменная для определения этого количества
   const countForOneTime = 20

   //дополнительная функция - останавливает выполнение асинхронного кода на
   //определенное время в миллисекундах
   const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

   //цикл работает пока i меньше числа всех записей
   //каждый раз i увеличивается на countForOneTime
   //зачем - ниже
   for (let i = 0; i <= fullNumber; i += countForOneTime) {
      //взять записи пользователей начиная с записи под номером i
      //в количестве countForOneTime
      //то есть в первую итерацию берутся документы 1-20
      //потом 21-40 и так далее. Без такой механики процесс
      //обновления бонусов пользователей сильно тормозил бы
      //другие процессы, так как обработка одновременно, например,
      //1000 пользователей будет сильно тормозить любые другие действия
      let id = await User.find({}).skip(i).limit(countForOneTime)
      //после получение пользователей оставить только их id
      id = id.map((user) => user.id)
      //обновить бонусы пользователей
      await refreshUserPromotions(id)
      //для каждого пользователя отправить сообщение об обновлении
      id.forEach((id) => bot.api.sendMessage(id, "я обновил твои бонусы"))
      //чтобы не превышать лимиты телеграмма 30 сообщений/секунда
      //установлена задержка - так лимиты точно не будут превышены
      await sleep(500)
   }
}

module.exports = refreshPormotions
