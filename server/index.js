require("dotenv").config()
const { session, GrammyError, HttpError } = require("grammy")

const { autoRetry } = require("@grammyjs/auto-retry")

const { conversations, createConversation } = require("@grammyjs/conversations")
const start_conversation = require("./conversations/start")
const promotions_conversation = require("./conversations/promotion")
const my_promo_conversation = require("./conversations/my_promo")
const online_order_conversation = require("./conversations/online_order")
const officiant_mode_conversation = require("./conversations/ofiiciant_mode")
const administrator_mode_conversation = require("./conversations/administrator_mode")
const bot = require("./bot")

const database_connect = require("./database/connect")
const database_getProducts = require("./database/getProducts")

const middleware_cheskAcess = require("./middlewares/checkAcess")

const cron = require("node-cron")
const schedule_refreshPromotions = require("./shedules/refreshPromotions")
//подключение базы данных
database_connect()

bot.on(":text", middleware_cheskAcess)

//подключение к боту возможности работать со беседами (conversations)
bot.use(session({ initial: () => ({}) }))
bot.use(conversations())

//подключение плагина autoRetry - при превышении количества запросов в секунду от бота,
//плагин должен заметить ошибку http и переотправить сообщения с ошибкой через некоторое
//время
bot.api.config.use(autoRetry())

//подключение бесед
bot.use(createConversation(start_conversation))
bot.use(createConversation(promotions_conversation))
bot.use(createConversation(my_promo_conversation))
bot.use(createConversation(online_order_conversation))
bot.use(createConversation(officiant_mode_conversation))
bot.use(createConversation(administrator_mode_conversation))

//подключение команд для входа в беседы
bot.command("start", async (ctx) => await ctx.conversation.enter("start_conversation"))
bot.command("promotions", async (ctx) => await ctx.conversation.enter("promotions_conversation"))
bot.command("my_promo", async (ctx) => await ctx.conversation.enter("my_promo_conversation"))
bot.command("online_order", async (ctx) => await ctx.conversation.enter("online_order_conversation"))
bot.command("start_officiant", async (ctx) => await ctx.conversation.enter("officiant_mode_conversation"))
bot.command("start_administrator", async (ctx) => await ctx.conversation.enter("administrator_mode_conversation"))

//стандартный отлов оишбки из документации grammy
bot.catch((err) => {
   const ctx = err.ctx
   console.error(`Error while handling update ${ctx.update.update_id}:`)
   const e = err.error
   if (e instanceof GrammyError) {
      console.error("Error in request:", e.description)
   } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e)
   } else {
      console.error("Unknown error:", e)
   }
})

//запуск бота
bot.start()

//создание сервера
const express = require("express")
const User = require("./database/models/User")
const checkAcess = require("./middlewares/checkAcess")
const app = express()
app.use(express.json())

//отправка всех продуктов из меню
app.get("/api/products", async (req, res) => res.json(await database_getProducts()))

//создание процесса, который выполняется каждый понедельник - то есть 1 день недели
//таймзона - Томская область, что соотвествует GMT+7
//https://raw.githubusercontent.com/node-cron/tz-offset/master/generated/offsets.json
//ссылка на список названий таймзон для использования
//запускаемый процесс - вызов функции refreshPromotions для обновления бонусов
cron.schedule("0 0 8 * * 1", () => schedule_refreshPromotions(), { timezone: "Etc/GMT+7" })

//подключение прослушки сервера на 5000 порт
app.listen(5000, () => console.log(`порт 5000 прослушивается`))
