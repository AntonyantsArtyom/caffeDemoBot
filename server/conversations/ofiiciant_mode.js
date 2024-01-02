const database_usePromo = require("../database/usePromo")

const { InlineKeyboard, Keyboard } = require("grammy")

const database_getClient = require("../database/getClient")

const officiant_mode_conversation = async (conversation, ctx) => {
   await ctx.reply("код клиента:")
   //получение кода клиента
   let id = await conversation.waitFor("message:text").then((ctx) => ctx?.message?.text)

   //получение клиента из базы данных по id
   let client = await database_getClient(id)

   //сообщение при отсутствии клиента в базе
   if (!client) {
      await ctx.reply("не найден клиент")
      return await ctx.reply(`новый клиент - /start_officiant`)
   }

   //парсинг информации о клиенте
   const name = client.name
   const week = client.weekPromotion
   const friend = client.friendPromotion * client.childrens.length
   const cashback = Number(client?.cashback)

   //создание текста с информацией - неактивные акции не упоминаются в тексте
   let text = ""
   text += "имя: " + name + "\n"
   if (week != "") text += "недельный бонус:\n" + week + "\n"
   if (friend != 0) text += "бонус за друзей:\n-" + friend + " рублей\n"
   if (cashback != 0) text += "накопления:\n-" + cashback + " рублей"

   //отправка текста
   await ctx.reply(text)

   //создание переменных-переключателей для использования бонусов
   let use_week = false
   let use_friend = false
   let use_cashbank = false

   //если у пользователя есть бонус недели
   if (week != "") {
      //вывести вопрос о его использовании
      const keyboard = new Keyboard().text("нет").text("да").resized()
      await ctx.reply("использовать недельный бонус", { reply_markup: keyboard })
      //если пользователь будет использовать бонус - изменить соответствующий переключатель
      const result = await conversation.wait().then((ctx) => ctx.message.text)
      use_week = result == "да"
   }

   //если у пользователя есть бонус за друзей
   if (friend != 0) {
      //вывести вопрос о его использовании
      const keyboard = new Keyboard().text("нет").text("да").resized()
      await ctx.reply("использовать бонус за друзей", { reply_markup: keyboard })
      //если пользователь будет использовать бонус - изменить соответствующий переключатель
      const result = await conversation.wait().then((ctx) => ctx.message.text)
      use_friend = result == "да"
   }

   //если у пользователя есть накопления
   if (cashback != 0) {
      //вывести вопрос об использовании
      const keyboard = new Keyboard().text("нет").text("да").resized()
      await ctx.reply("использовать накопления", { reply_markup: keyboard })
      //если пользователь будет использовать бонус - изменить соответствующий переключатель
      const result = await conversation.wait().then((ctx) => ctx.message.text)
      use_cashbank = result == "да"
   }

   //спросить цену заказа и удалить клавиатуру выбора бонусов
   await ctx.reply(`введи цену заказа`, {
      reply_markup: { remove_keyboard: true },
   })

   //дождаться ввода цены заказа
   let price = await conversation.wait().then((ctx) => ctx.message.text)
   //цена может иметь вид 100+200*2 - то есть математического выражение
   //поэтому цена дополнительно парсится и считается через eval
   //так как через eval можно обращаться к переменным - в введенной цене все
   //символы, кроме чисел и знаков +* удаляются
   price = Number(eval(price.replace(/[^0-9\+\*]/g, "")))

   //обработка случая ошибок в цене
   if (price == 0 || price == undefined || String(price) == "NaN") {
      await ctx.reply("ошибка в цене - заказ прерван")
      return await ctx.reply(`новый клиент - /start_officiant`)
   }

   //отправка информации о цене и использованных бонусах в базу данных
   //использованные бонусы обнулятся, накопления увеличатся в зависимости
   //от цены заказа
   await database_usePromo(id, use_week, use_friend, use_cashbank, price)

   //подсчет цены с учетом использования бонуса за друзей и кэшбека
   let price_with_promo = price
   if (use_friend) price_with_promo -= friend
   if (use_cashbank) price_with_promo -= cashback
   //отправка информации о новой цене, после вычета бонусов
   await ctx.reply(`Готово. Цена с учетом скидок:\n${price_with_promo} рублей`)
   //так как недельный бонус - это не просто обычная скидка, а строка вида
   //"при цене заказа больше 500 рублей - кофе бесплатно" - парсить эту
   //информацию неудобно, поэтому недельный бонус считается вручную
   if (use_week) await ctx.reply(`недельный бонус считается вручную`)
   //сообщение о команде для ввода нового клиента
   await ctx.reply(`новый клиент - /start_officiant`)
}

module.exports = officiant_mode_conversation
