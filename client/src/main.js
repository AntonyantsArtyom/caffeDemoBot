import "./style.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import { createRouter, createWebHistory } from "vue-router"
import ProductsPage from "./pages/ProductsPage.vue"
import App from "./App.vue"

const router = createRouter({
   history: createWebHistory(),
   routes: [{ path: "/", component: ProductsPage }],
})
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount("#app")
