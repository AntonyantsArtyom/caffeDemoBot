<script setup>
import { useProductStore } from "../stores/productsStore"
import Card from "./Card.vue"
const productsStore = useProductStore()
</script>
<template>
   <Card
      v-for="product in productsStore.products"
      :key="product.id"
      :image="product.image"
      :name="product.name"
      :description="product.description"
      :price="product.price"
      :count="0"
      :id="product.id"
   />
</template>
