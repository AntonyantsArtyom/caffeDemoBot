const User = require("./models/User")

const usePromo = async (id, week, friend, cashback, price) => {
   //создать объект для хранения новых значений настроек, то есть
   //если недельный бонус будет использоваться - значение этого
   //бонуса будет равно пустой строке и так далее
   const update = {}
   if (week) update.weekPromotion = ""
   if (friend) update.friendPromotion = 0
   if (cashback) update.cashback = 0

   //обновить документ по id, в качестве объекта обновления идет созданный до
   //этого объекта, то есть если бонус нужно обновить - то в объекте update хранится
   //свойство с именем бонуса из базы данных и обнуленным значением - 0 или пустая строка
   //если свойства с именем бонуса нет в объекте update, то он не меняется
   await User.findOneAndUpdate({ id }, update)
   //увеличисть накопления пользователя, увеличение происходит на 5 рублей за
   //каждые 100 потраченных
   await User.findOneAndUpdate({ id }, { $inc: { cashback: 5 * Math.floor(price / 100) } })
}

module.exports = usePromo
