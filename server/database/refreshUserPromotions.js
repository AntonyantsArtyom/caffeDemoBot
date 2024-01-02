const User = require("./models/User")
const text = require("../texts")
const refreshUserPromotions = async (idList) => {
   //обносить бонусы всех объектов, id которых есть в списке idList
   await User.updateMany(
      { id: { $in: idList } },
      {
         weekPromotion: text.weeksPromotionsList[Math.floor(Math.random() * text.weeksPromotionsList.length)],
         friendPromotion: 5,
      }
   )
}

module.exports = refreshUserPromotions
