<script setup>
import { storeToRefs } from "pinia"
import { useHoversStore } from "../stores/hoversStore"
import BasketButton from "../components/BasketButton.vue"
import Basket from "../components/Basket.vue"
import Shadow from "../components/Shadow.vue"
import Card from "../components/Card.vue"
import { onMounted } from "vue"
onMounted(() => window.Telegram.WebApp.expand())

import { useProductStore } from "../stores/productsStore"
const productsStore = useProductStore()
const { products } = storeToRefs(productsStore)
onMounted(() => productsStore.fillProducts())

const hoversStore = useHoversStore()
</script>

<template>
   <Shadow v-if="hoversStore.basket" />
   <Basket v-if="hoversStore.basket" />
   <Card
      v-for="product in products"
      :key="product.id"
      :image="product.image"
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :count="0"
      :id="product.id"
   />
   <BasketButton />
</template>

<style scoped></style>
