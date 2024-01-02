import { defineStore } from "pinia"
import { useProductStore } from "./productsStore"

export const useBasketStore = defineStore("basket", {
   state: () => ({ basket: [] }),
   getters: {
      products() {
         const productsStore = useProductStore()
         let products = JSON.parse(JSON.stringify(productsStore.products))
         products.forEach((product) => (product.count = this.basket.find((p) => p.id == product.id)?.count))
         products = products.filter((product) => product.count != undefined)
         return products
      },
      totalPrice() {
         const productsStore = useProductStore()
         let products = JSON.parse(JSON.stringify(productsStore.products))
         products.forEach((product) => (product.count = this.basket.find((p) => p.id == product.id)?.count))
         products = products.filter((product) => product.count != undefined)
         let totalPrice = 0
         products.forEach((product) => (totalPrice += product.count * product.price))
         return totalPrice
      },
   },
   actions: {
      changeTo(id, count) {
         const product = this.basket.find((product) => product.id == id)
         if (product == undefined) this.basket.push({ id, count })
         else this.basket.find((product) => product.id == id).count = count
         this.basket = this.basket.filter((product) => product.count != 0)
      },
      getCount(id) {
         const count = this.basket.find((product) => product.id == id)?.count
         return count ? count : 0
      },
      sendBasketToBot() {
         const products = JSON.parse(JSON.stringify(this.products))
         products.forEach((product) => (product.image = null))
         window.Telegram.WebApp.sendData(JSON.stringify(products))
      },
   },
})
