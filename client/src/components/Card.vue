<script setup>
import { reactive, toRefs, watch } from "vue"
import { useBasketStore } from "../stores/basketStore"
import { storeToRefs } from "pinia"
//получение данных pinia-хранилища корзины
const basket = useBasketStore()
//получение пропсов, переданных из родительского компонента - родительский
//компонент получает массив продуктов из pinia-хранилища продуктов, родительский
//компонент - ProductPage
const props = defineProps(["image", "name", "description", "price", "id", "count"])
//превращение объекта props в реактивные переменные
const { image, name, count, description, id } = toRefs(reactive({ ...props }))
//функция для изменения количества продуктов в корзине - на вход подается значение изменения
const changeCount = (change) => {
   //если количество в итоге станет меньше 0 - прервать функцию
   if (count.value + change < 0) return
   //изменить значение количества продукта в массиве продуктов корзины
   //передается id товара, для которого мы обновили значение и новое значение
   basket.changeTo(id.value, count.value + change)
}
//по какой-то причине изменение количества продукта в корзине не ререндерит компонент
//поэтому мы следим за полной ценой товаров в корзине - если она изменилась, значит
//количество какого-то продукта изменилось
const { totalPrice } = storeToRefs(basket)
//через watch следим за полной ценой
//при изменении полной цены обновляем count - через метод getCount pinia-хранилища корзины получаем
//количество продукта в массиве корзины и присваиваем это значение count, обновление count вызывает ререндер
//если количество продукта в компоненте и в хранилище одно и то же - значит, был изменен другой продукт
//если разное - значит этот, в первом случае count сохранит свое значение, иначе примет значение из хранилища
watch([totalPrice], () => (count.value = basket.getCount(id.value)))
</script>

<template>
   <!--карточка товара - карточка с фото, названием, ценой, количеством товара в корзине и описанием продукта -->
   <!--в карточке есть так же кнопки для изменения количества товара в корзине -->
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
