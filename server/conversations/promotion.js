const { v4 } = require("uuid")

const { InlineKeyboard } = require("grammy")

const texts = require("../texts")

const promotions_conversation = async (conversation, ctx) => {
   //список информации о всех бонусах
   const promotions = [texts.week, texts.friend, texts.accumulation]

   //сообщение о первом бонусе из списка
   const inlineKeyboard = new InlineKeyboard().text("👉", "1")
   await ctx.reply(promotions[0](ctx.from.id), {
      reply_markup: inlineKeyboard,
   })

   //подсказка о вызове информации о своих бонусах
   await ctx.reply(texts.my_promo_prompt)

   //перелистывание информации о бонусах
   while (true) {
      //ИСПРАВЛЕННЫЙ БАГ:
      //при спаме кнопки переключения возникала ошибка - editMessageText отправлял телеграмму неизмененные данные,
      //что останавливало работу бота

      //возможные полезные значения data для кнопки должны быть - 0 1 2
      const ctx = await conversation.waitForCallbackQuery()
      await ctx.answerCallbackQuery()

      //получение полезного значения
      const index = ctx.update.callback_query.data[0]

      //для исправления бага к полезному значению прибавляется рандомного-генерируемая строка, так данные всегда меняются
      const inlineKeyboard = new InlineKeyboard().text("👉", "" + (+index + 1) + v4())

      //переключение информации об акциях по индексу из полезного значения
      ctx.editMessageText(promotions[+index % 3](ctx.from.id), {
         reply_markup: inlineKeyboard,
      })
   }
}

module.exports = promotions_conversation
