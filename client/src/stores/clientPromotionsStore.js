import { defineStore } from "pinia"
import axios from "axios"

export const useClientPromotionsStore = defineStore("clientPromotionsStore", {
   state: () => ({ client: null }),
   actions: {
      async getClient(id) {
         this.client = await axios.get(`/api/clients/${id}`).then((response) => response.data)
      },
      removeClient() {
         this.client = null
      },
      async usePromo(id, week, friend, cashback, price) {
         await axios.post(`/api/client/usePromo/${id}`, {
            week,
            friend,
            cashback,
            price,
         })
      },
   },
})
