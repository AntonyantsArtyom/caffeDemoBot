<script setup>
import { ref, watch } from "vue"
import { useBasketStore } from "../stores/basketStore"
import { storeToRefs } from "pinia"
const basket = useBasketStore()
const props = defineProps(["image", "name", "description", "price", "id", "count"])
const image = ref(props.image)
const name = ref(props.name)
const count = ref(props.count)
const description = ref(props.description)
const id = ref(props.id)
const changeCount = (change) => {
   if (count.value + change < 0) return
   count.value += change
   basket.changeTo(id.value, count.value)
}
const { totalPrice } = storeToRefs(basket)
watch([totalPrice], () => (count.value = basket.getCount(id.value)))
</script>

<template>
   <div class="card">
      <h1 class="name">{{ name }}</h1>
      <img :src="image" class="image" />
      <p class="description">{{ description }}</p>
      <button class="plus_button" @click="changeCount(+1)">+</button>
      <p class="count">{{ count }}</p>
      <button class="minus_button" @click="changeCount(-1)">-</button>
      <p class="price">{{ price + "Р" }}</p>
   </div>
</template>

<style scoped>
.price {
   position: absolute;
   left: 150px;
   top: 160px;

   color: var(--text-color);
   font-family: Inter;
   font-size: 22px;
   font-style: normal;
   font-weight: 400;
   line-height: 32px;
}
.minus_button {
   background: var(--button-color);

   z-index: 2;
   position: absolute;
   bottom: 15px;
   right: 100px;

   width: 35px;
   height: 35px;
   border: none;
   outline: none;
   border-radius: 50%;

   color: var(--button-text-color);
   font-size: 32px;
   font-style: normal;
   font-weight: 400;
   line-height: 30px;
}
.count {
   background: var(--second-bg-color);
   position: absolute;
   right: 15px;
   bottom: 15px;

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
   bottom: 15px;
   right: 15px;

   width: 35px;
   height: 35px;
   border: none;
   outline: none;
   border-radius: 50%;

   color: var(--button-text-color);
   font-size: 32px;
   font-style: normal;
   font-weight: 400;
   line-height: 32px;
}
.description {
   position: absolute;
   left: 150px;
   top: 70px;
   font-size: 14px;
   white-space: pre-wrap;

   overflow: hidden;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;
   line-height: 1.3em;
   height: 3.9em;
}
.name {
   position: absolute;
   left: 15px;
   top: 5px;

   font-size: 28px;
}
.image {
   width: 130px;
   height: 130px;
   background: green;
   border-radius: 22px;
   position: absolute;
   bottom: 15px;
   left: 15px;
}
.card {
   max-width: 400px;
   height: 200px;
   margin: auto;
   background-color: var(--card-bg-color);
   border-radius: 25px;
   position: relative;
   margin-top: 10px;
}
</style>
