const bot = require("../bot")
const texts = require("../texts")

const database_addNewUserFromContext = require("../database/addNewUserFromContext")

const start_conversation = async (conversation, ctx) => {
   //получение id пригласившего, для /start 195433 пригласивший - 195433
   let father = ctx.update.message.text.replace("/start", "").trim()
   //получение режима работы бота, для /start ofiiciant режим - officiant
   let mode = ctx.update.message.text.replace("/start", "").trim()

   //переход в беседу для официанта, если введен режим официанта
   if (mode == "officiant") {
      //приветственное сообщение для оффицианта
      await ctx.reply("введи код клиента - его можно получить, если клиент введет у себя в боте команду my_promo")
      //переход в беседу официанта
      return await ctx.conversation.enter("officiant_mode_conversation")
   }

   //запрос на сохранение имени
   await ctx.reply(texts.name_registration)
   const name = await conversation.wait().then((ctx) => ctx.message.text)

   //запрос на сохранение id
   await ctx.reply(texts.id_registration)
   await ctx.reply(texts.agree)
   const answer = await conversation.wait().then((ctx) => ctx.message.text.toLowerCase())

   //обработка отказа от сохранения id
   if (!(answer === "согласен" || answer === "согласна")) {
      await ctx.reply(texts.not_agree)
      return await ctx.reply(texts.reset)
   }

   //сохранение пользователя в базе данных
   const saveResult = await database_addNewUserFromContext(ctx, { name, father })

   //сообщение о завершении регистрации
   if (saveResult === true) await ctx.reply(texts.finish_registration)

   //сообщение о наличии пользователя в базе данных
   if (saveResult === "dublicate") await ctx.reply("Ты уже проходил регистрацию")

   //сообщение с меню
   const menu = await ctx.reply(texts.menu)

   //закрепление меню в закрепленных сообщениях
   await bot.api.pinChatMessage(menu.chat.id, menu.message_id)
}

module.exports = start_conversation
