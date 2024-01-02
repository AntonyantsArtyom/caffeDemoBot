import { defineStore } from "pinia"
import axios from "axios"

export const useProductStore = defineStore("products", {
   state: () => ({
      products: [],
   }),
   actions: {
      async fillProducts() {
         this.products = await axios.get("/api/products").then((response) => response.data)
      },
   },
})
