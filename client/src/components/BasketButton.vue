<script setup>
import { useHoversStore } from "../stores/hoversStore"
const hoversStore = useHoversStore()
const hoverBasket = () => hoversStore.set("basket", true)
import { useBasketStore } from "../stores/basketStore"
const basket = useBasketStore()
</script>

<template>
   <button
      v-bind:class="{ long: basket.totalPrice > 9999, short: basket.totalPrice == 0 }"
      class="button"
      @click="hoverBasket"
   >
      <img class="image" src="/basket.svg" />
      <p class="price">{{ basket.totalPrice != 0 ? basket.totalPrice + "Р" : "" }}</p>
   </button>
</template>

<style scoped>
.long {
   width: 130px !important;
}
.short {
   width: 50px !important;
}
.price {
   position: absolute;
   color: var(--button-text-color);
   right: 10px;
   top: 11px;
   font-family: Inter;
   font-size: 22px;
   font-style: normal;
   font-weight: 400;
   line-height: 32px;
}

.button {
   border: none;
   outline: none;
   width: 110px;
   height: 50px;
   border-radius: 50px;
   background: var(--button-color);
   position: fixed;
   bottom: 25px;
   left: 50%;
   transform: translate(-50%, 0%);
}

.image {
   position: absolute;
   filter: invert(1);
   width: 30px;
   left: 10px;
   top: 10px;
}
</style>
