const User = require("./models/User")
const text = require("../texts")
const addNewUserFromContext = async (ctx, payload) => {
   //получение id из контекста
   const id = ctx.from.id

   //свойства нового пользователя по умолчанию
   const childrens = []
   const friendPromotion = 5
   const cashback = 0

   //генерация случайного недельного бонуса
   const weekPromotion = text.weeksPromotionsList[Math.floor(Math.random() * text.weeksPromotionsList.length)]

   //получение дополнительных данных
   const name = payload.name
   const father = payload.father.trim()

   //сохранение нового пользователя и обработка ошибки при повторной регистрации пользователя с одним и тем же id
   try {
      await new User({ name, id, father, childrens, weekPromotion, friendPromotion, cashback }).save()
   } catch (error) {
      if (error.code === 11000) return "dublicate"
   }

   //добавление пригласившему id пользователя в список приглашенных людей
   if (father != "" && id != father) {
      const fatherDocument = await User.findOne({ id: father })
      if (fatherDocument && fatherDocument.childrens.length <= 10) {
         await User.findOneAndUpdate({ id: father }, { $push: { childrens: id } })
      }
   }

   //если все прошло без ошибок - функция возвращет true
   return true
}

module.exports = addNewUserFromContext
