<script setup>
import { watch, ref } from "vue"
import PromoActivator from "../components/PromoActivator.vue"
import { useClientPromotionsStore } from "../stores/clientPromotionsStore"
import { storeToRefs } from "pinia"

const clientPromotionsStore = useClientPromotionsStore()
const code = ref("")
const price = ref("")
const useWeekPromotion = ref(false)
const useFriendPromotion = ref(false)
const useCashback = ref(false)

const { client } = storeToRefs(clientPromotionsStore)
const finish = async () => {
   await clientPromotionsStore.usePromo(
      client.value.id,
      useWeekPromotion.value,
      useFriendPromotion.value,
      useCashback.value,
      Number(price.value)
   )
}

const weekText = ref("")
const friendText = ref("")
const cashbackText = ref("")
const weekCondition = ref(false)
const friendCondition = ref(false)
const cashbackCondition = ref(false)
watch(code, async () => {
   if (code.value.length == 10) {
      await clientPromotionsStore.getClient(code.value)

      weekCondition.value = client.value?.weekPromotion != "" && client.value?.weekPromotion != undefined
      friendCondition.value =
         client.value?.childrens?.length * client.value?.friendPromotion != undefined &&
         client.value?.childrens?.length * client.value?.friendPromotion != 0 &&
         (client.value?.childrens?.length * client.value?.friendPromotion).toString() != "NaN"
      cashbackCondition.value = client.value?.cashback != 0 && client.value?.cashback != null

      weekText.value = client.value?.weekPromotion

      const friendPromo = client.value?.childrens?.length * client.value?.friendPromotion
      const friendCount = client.value?.childrens?.length
      friendText.value = "-" + friendPromo + " рублей за " + friendCount + " друзей/друга"

      cashbackText.value = "-" + client.value?.cashback + " рублей"
   } else clientPromotionsStore.removeClient(code.value)
})
</script>

<template>
   <div class="inputs">
      <div>
         <h2 class="code_description">код клиента</h2>
         <input class="code_input" v-model="code" />
      </div>
      <div>
         <h2 class="price_descritpion">сумма заказа</h2>
         <input class="price_input" v-model.number="price" />
      </div>
   </div>
   <div class="activators">
      <PromoActivator
         v-if="weekCondition"
         description="недельный бонус"
         :information="weekText"
         @toggle="(value) => (useWeekPromotion = value)"
      />
      <PromoActivator
         v-if="friendCondition"
         description="бонус за друзей"
         :information="friendText"
         @toggle="(value) => (useFriendPromotion = value)"
      />
      <PromoActivator
         v-if="cashbackCondition"
         description="накопления"
         :information="cashbackText"
         @toggle="(value) => (useCashback = value)"
      />
   </div>
   <button v-if="client && price != 0" class="finish" @click="finish">ПРИМЕНИТЬ</button>
</template>

<style scoped>
.finish {
   color: #fff;
   font-family: Inter;
   font-size: 24px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
   width: 370px;
   height: 50px;
   border-radius: 25px;
   background: #2196f3;
   border: none;
   outline: none;
   display: block;
   margin-left: auto;
   margin-right: auto;
   margin-top: 25px;
}
.inputs {
   display: flex;
   justify-content: space-between;
   width: 370px;
   margin: auto;
   margin-bottom: 25px;
   margin-top: 50px;
}
.activators {
   width: 370px;
   margin: auto;
   display: grid;
   gap: 20px;
}

.code_description,
.price_descritpion {
   color: #000;
   font-size: 16px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
}

.code_input,
.price_input {
   height: 50px;
   flex-shrink: 0;
   border-radius: 25px;
   background: #2196f3;
   outline: none;
   border: none;

   color: #000;
   font-size: 16px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
   padding-left: 15px;
}
.price_input {
   width: 125px;
}
.code_input {
   width: 235px;
}
</style>
