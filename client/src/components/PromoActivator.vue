<script setup>
import { ref, toRefs } from "vue"
const props = defineProps(["description", "information"])
const emit = defineEmits(["toggle"])
const { description, information } = toRefs(props)
const value = ref(false)
const toggle = (value) => emit("toggle", !value)
</script>
<template>
   <div class="promoActivator">
      <div class="texts">
         <p class="description">{{ description }}</p>
         <p class="information">{{ information }}</p>
      </div>
      <label class="switch">
         <input type="checkbox" @input="toggle(value)" v-model="value" />
         <span class="slider round"></span>
      </label>
   </div>
</template>
<style scoped>
.promoActivator {
   display: flex;
   justify-content: space-between;
   width: 370px;
}

.description {
   color: #000;
   font-size: 20px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
}
.information {
   color: #000;
   font-size: 12px;
   font-style: normal;
   font-weight: 400;
   line-height: normal;
}

.switch {
   position: relative;
   display: inline-block;
   width: 60px;
   height: 34px;
}
.switch input {
   display: none;
}
.slider {
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ccc;
   -webkit-transition: 0.4s;
   transition: 0.4s;
}
.slider:before {
   position: absolute;
   content: "";
   height: 26px;
   width: 26px;
   left: 4px;
   bottom: 4px;
   background-color: white;
   -webkit-transition: 0.4s;
   transition: 0.4s;
}
input:checked + .slider {
   background-color: #2196f3;
}
input:focus + .slider {
   box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
   -webkit-transform: translateX(26px);
   -ms-transform: translateX(26px);
   transform: translateX(26px);
}
.slider.round {
   border-radius: 34px;
}
.slider.round:before {
   border-radius: 50%;
}
</style>
