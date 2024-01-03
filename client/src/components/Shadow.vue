<script setup></script>

<template>
   <!--блок тени, растягивается на весь экран, имеет средний z-index - перекрываает обычные элементы, но не всплывающие -->
   <div class="shadow"></div>
</template>

<style scoped>
.shadow {
   /*растяжение блока на весь экран*/
   position: fixed;
   width: 100%;
   height: 100%;
   top: 0px;
   bottom: 0px;
   left: 0px;
   right: 0px;
   /*установка цвета фона из переменной*/
   background-color: var(--body-bg-color);
   /*блок частично прозрачен - объекты взади просвечивают на 15% */
   opacity: 0.85;
   /*индекс по оси z, который больше индекса стандартных элементов, но меньше всплывающих*/
   z-index: 4;
}
</style>
