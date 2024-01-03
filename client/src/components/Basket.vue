<script setup>
import { useBasketStore } from "../stores/basketStore"
import { useHoversStore } from "../stores/hoversStore"
import BasketCard from "./BasketCard.vue"
import { storeToRefs } from "pinia"
const hoversStore = useHoversStore()
const color = getComputedStyle(document.body).getPropertyValue("--button-color")
const closeBasket = () => hoversStore.set("basket", false)
const basket = useBasketStore()
const { products } = storeToRefs(basket)
</script>

<template>
   <div class="basket">
      <div class="cards">
         <BasketCard
            v-for="product in products"
            :image="product.image"
            :key="product.id"
            :id="product.id"
            :name="product.name"
            :price="product.price"
            :count="product.count"
         />
      </div>
      <hr class="line" />
      <p class="price">Итого: {{ basket.totalPrice }}</p>
      <button class="order" @click="basket.sendBasketToBot">ОФОРМИТЬ</button>
      <div class="cross-area" @click="closeBasket">
         <svg class="cross" width="32" height="32" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M4.11 2.697L2.698 4.11 6.586 8l-3.89 3.89 1.415 1.413L8 9.414l3.89 3.89 1.413-1.415L9.414 8l3.89-3.89-1.415-1.413L8 6.586l-3.89-3.89z"
               :fill="color"
            ></path>
         </svg>
      </div>
   </div>
</template>

<style scoped>
.basket {
   padding-top: 15px;
   width: 320px;
   height: calc(100% - 40px);
   border-radius: 25px;
   background: var(--card-bg-color);
   position: fixed;
   transform: translate(0%, -50%);
   top: 50%;
   right: 10px;
   z-index: 10;
}
.cards {
   height: calc(100% - 140px);
   overflow-y: scroll;
}
.line {
   width: 300px;
   height: 5px;
   border-radius: 25px;
   background: var(--button-color);
   border: none;
   outline: none;
   margin: auto;
}
.price {
   position: absolute;
   left: 16px;
   bottom: 90px;
   color: var(--text-color);
   font-size: 24px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
}
.order {
   position: absolute;
   left: 50%;
   transform: translate(-50%, 0);
   border: none;
   outline: none;

   bottom: 20px;
   width: 300px;
   height: 50px;
   border-radius: 25px;
   background: var(--button-color);

   color: var(--button-text-color);
   font-size: 24px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
}
.cross-area {
   width: 35px;
   height: 100px;
   border-radius: 22px 0px 0px 22px;
   background: var(--card-bg-color);
   position: absolute;
   left: -35px;
   top: 90px;
}
.cross {
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
}
</style>
