const name_registration = "Привет, рад видеть тебя в гостях.\nНапиши свое имя"
const id_registration = `Позволь сохранить твой id телеграмма. Так я смогу начислять тебе персональные бонусы`
const agree = `напиши "согласен" или "согласна"`
const not_agree = `Ты не дал свое согласие или ошибся в слове`
const reset = `для перезапуска диалога напиши /start`
const finish_registration = `Отлично! Ты прошел регистрацию`
const menu = `напиши команду и я выполню действие
/online_order - заказать доставку еды
/promotions - узнать об акциях
/my_promo - показать активные акции
/back - прервать диалог`.replaceAll("   ", "")
const week = (id) =>
   `каждую неделю
случайный бонус из списка
-10% от цены заказа
-50 рублей при заказе от 300 рублей
+бесплатное кофе к заказу от 400 рублей`.replaceAll("   ", "")
const weeksPromotionsList = [
   "-10% от цены заказа",
   "-50 рублей при заказе от 300 рублей",
   "+бесплатное кофе к заказу от 400 рублей",
]
const friend = (id) =>
   `приглашай друзей через ссылку
получай дополнительный недельный бонус
-5 рублей от цены заказа за друга
но не более 50 рублей

твоя персональная ссылка:
https://t.me/caffeBot_bot?start=${id}

отправь ее другу и получи бонус после его регистрации`.replaceAll("   ", "")
const accumulation = (id) =>
   `накопления\nза каждые 100 рублей от цены заказа вы
накапливаете 5 рублей бонуса, их можно списать в любое
время`.replaceAll("   ", "")
const my_promo_prompt = `действующие бонусы можно узнать через команду /my_promo`.replaceAll("   ", "")
module.exports = {
   name_registration,
   id_registration,
   agree,
   not_agree,
   reset,
   finish_registration,
   menu,
   week,
   friend,
   accumulation,
   my_promo_prompt,
   weeksPromotionsList,
}
