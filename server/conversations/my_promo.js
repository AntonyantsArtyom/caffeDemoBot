const User = require("../database/models/User")

const my_promo_conversation = async (conversation, ctx) => {
   //получение id из контекста
   const id = ctx.from.id

   //получение информации о бонусах пользователя
   let { weekPromotion, childrens, friendPromotion, cashback } = await User.findOne({ id })
   const friendCount = childrens.length

   //в базе в friendPromotion хранится бонус за 1 пользователя
   //меняет значение переменной на бонус за всех друзей
   friendPromotion = friendPromotion * friendCount

   //создание строк-оповещений о бонусах
   let weekPromotionString = "\n" + weekPromotion
   let friendPromotionString = "\n" + `-${friendPromotion} рублей за ${friendCount} друзей/друга`
   let cashbackString = "\n" + `-${cashback} рублей накоплений`

   //обнуление строк о бонусах, которые не действуют
   if (weekPromotion == "") weekPromotionString = ""
   if (friendPromotion == 0) friendPromotionString = ""
   if (cashback == 0) cashbackString = ""

   //отправка сообщение о активных бонусах
   await ctx.reply(`активные бонусы${weekPromotionString}${friendPromotionString}${cashbackString}`)

   //создание кода для официанта - id пользователя с пробелами после каждой 3 цифры
   let idString = String(id).split("").reverse().join("")
   idString = Number(idString).toLocaleString()
   idString = String(idString).split("").reverse().join("")

   //отправка кода для официантов
   await ctx.reply(`продиктуйте код официанту\nдля использования бонусов:\n${idString}`)
}

module.exports = my_promo_conversation
