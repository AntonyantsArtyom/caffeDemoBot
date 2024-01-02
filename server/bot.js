const { Bot } = require("grammy")

module.exports = new Bot(process.env.TELEGRAM_BOT_API_TOKEN, {})
