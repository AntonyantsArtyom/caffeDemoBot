<script setup>
import { reactive, ref, toRefs } from "vue"
import { useBasketStore } from "../stores/basketStore"
const props = defineProps(["image", "name", "count", "price", "id"])
const { image, name, count, price, id } = toRefs(reactive({ ...props }))
const basket = useBasketStore()
const changeCount = (change) => {
   if (count.value + change < 0) return
   count.value += change
   basket.changeTo(id.value, count.value)
}
</script>
<template>
   <div class="card">
      <h1 class="name">{{ name }}</h1>
      <img :src="image" class="image" />
      <button class="plus_button" @click="changeCount(+1)">+</button>
      <p class="count">{{ count }}</p>
      <button class="minus_button" @click="changeCount(-1)">-</button>
      <p class="price">{{ price + "Р" }}</p>
   </div>
</template>
<style scoped>
.card {
   height: 70px;
   position: relative;
   margin-bottom: 15px;
}
.minus_button {
   background: var(--button-color);
   z-index: 2;
   position: absolute;
   bottom: 5px;
   right: 100px;

   width: 35px;
   height: 35px;
   border: none;
   outline: none;
   border-radius: 50%;

   color: var(--text-color);
   font-size: 32px;
   font-style: normal;
   font-weight: 400;
   line-height: 30px;
}
.count {
   background: var(--second-bg-color);
   position: absolute;
   right: 15px;
   bottom: 5px;

   width: 80px;
   height: 35px;
   border-radius: 50px;

   color: var(--text-color);
   font-family: Inter;
   font-size: 32px;
   font-style: normal;
   font-weight: 400;
   line-height: 32px;

   padding-left: 10px;
}
.plus_button {
   background: var(--button-color);

   z-index: 2;
   position: absolute;
   bottom: 5px;
   right: 15px;

   width: 35px;
   height: 35px;
   border: none;
   outline: none;
   border-radius: 50%;

   color: var(--text-color);
   font-size: 32px;
   font-style: normal;
   font-weight: 400;
   line-height: 32px;
}
.price {
   color: var(--text-color);
   font-size: 22px;
   font-style: normal;
   font-weight: 400;
   position: absolute;
   left: 95px;
   bottom: 8px;
}
.name {
   position: absolute;
   left: 95px;
   top: 1px;
   color: var(--text-color);
   font-size: 16px;
   font-style: normal;
   font-weight: 400;
   line-height: 14px;
}

.image {
   height: 70px;
   width: 70px;
   background: green;
   border-radius: 22px;
   position: absolute;
   top: 0px;
   left: 15px;
}
</style>
