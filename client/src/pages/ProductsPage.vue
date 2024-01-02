<script setup>
import BasketButton from "../components/BasketButton.vue"
import Basket from "../components/Basket.vue"
import Shadow from "../components/Shadow.vue"
import { onMounted } from "vue"
onMounted(() => window.Telegram.WebApp.expand())

import { useProductStore } from "../stores/productsStore"
const productStore = useProductStore()
onMounted(() => productStore.fillProducts())

import { useHoversStore } from "../stores/hoversStore"
import CardsList from "../components/CardsList.vue"
const hoversStore = useHoversStore()
</script>

<template>
   <Shadow v-if="hoversStore.basket" />
   <Basket v-if="hoversStore.basket" />
   <CardsList />
   <BasketButton />
</template>

<style scoped></style>
