const administrator_mode_conversation = async (conversation, ctx) => {
   await ctx.reply("ты в чате администратора - все заказы из бота присылаются сюда")
   //администраторы принимают в сообщения бота информацию из заказа - у них нет своих дейсвий
   //поэтому беседа администраторров по сути пуста
}

module.exports = administrator_mode_conversation
