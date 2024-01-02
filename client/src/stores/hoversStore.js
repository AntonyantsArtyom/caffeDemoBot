import { defineStore } from "pinia"

export const useHoversStore = defineStore("hovers", {
   state: () => ({ basket: false }),
   actions: {
      set(component, newHoverState) {
         this[component] = newHoverState
      },
   },
})
