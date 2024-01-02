const { InlineKeyboard, Keyboard } = require("grammy")

const database_findWorkersFromType = require("../database/findWorkersFromType")
const bot = require("../bot")

const online_order_conversation = async (conversation, ctx) => {
   //отправка меню
   let keyboard = new Keyboard().webApp("открыть меню", "https://a328-89-42-62-13.ngrok-free.app").persistent()
   await ctx.reply("добавь товары в корзину через кнопку меню", {
      reply_markup: keyboard,
   })

   //получение списка продуктов из корзины webApp
   const message = await conversation.wait().then((ctx) => ctx.message)

   //обработка сообщений, которые получены не от webApp - заказ прерывается
   if (!message?.web_app_data) return await ctx.reply("заказ прерван", { reply_markup: { remove_keyboard: true } })

   //парсинг продуктов - остаются только название, цена и количество
   const basketData = JSON.parse(message.web_app_data.data).map((product) => {
      return { name: product.name, price: product.price, count: product.count }
   })

   let totalPrice = 0
   basketData.forEach((product) => (totalPrice += product.count * product.price))

   //отправка сообщения проверки корзины
   let basketDataString = ""
   basketData.forEach((product) => {
      basketDataString += "\n" + product.name + " кол-во: " + product.count
   })
   await ctx.reply("заказ:" + basketDataString, {
      reply_markup: { remove_keyboard: true },
   })
   await ctx.reply("полная цена: " + totalPrice + "Р")
   await ctx.reply("все верно? да/нет")
   let result = await conversation.wait().then((ctx) => ctx.message.text)

   //обработка сообщения о неправильном списке продуктов
   if (result.toLowerCase() != "да") return await ctx.reply("начни все сначала - /online_order")

   //заполнение телефона и адреса
   await ctx.reply("введи номер телефона")
   const phone = await conversation.wait().then((ctx) => ctx.message.text)
   await ctx.reply("введи адрес")
   const adress = await conversation.wait().then((ctx) => ctx.message.text)

   //проверка телефона и адреса
   await ctx.reply("телефон: " + phone + "\nадрес: " + adress)
   await ctx.reply("все верно? да/нет")
   result = await conversation.wait().then((ctx) => ctx.message.text)

   //обработка ошибки в телефоне и адресе
   if (result.toLowerCase() != "да") return await ctx.reply("начни все сначала - /online_order")

   //сообщение при верных данных
   await ctx.reply("я передал заказ администратору - скоро он позвонит для подтверждения")

   //получение всех администраторов
   const administrators = await database_findWorkersFromType("administrator")

   //отправка заказа всем администраторам
   //если их больше 30 - в телеграмме может возникнуть ошибка, ее обход написан в refreshPromotions
   //но скорее всего администраторов заведения будет меньше
   for (let { id } of administrators) {
      bot.api.sendMessage(id, "заказ:" + basketDataString + "\n\nтелефон:\n" + phone + "\nадрес:\n" + adress)
   }
}

module.exports = online_order_conversation
