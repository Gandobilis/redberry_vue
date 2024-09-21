<template>
  <carousel items-to-show="4" snap-align="start" :wrap-around="true">
    <slide v-for="index in 10" :key="index">
<!--      <img src="/image.png"/>-->
    </slide>
    <template #addons>
      <navigation>
        <template #next>
          <img src="/src/assets/icons/right.svg"
               style="position: absolute; right: -50px; top: 50%; transform: translateY(-50%); z-index: 10;"/>
        </template>
        <template #prev>
          <img src="/src/assets/icons/left.svg"
               style="position: absolute; left: -50px; top: 50%; transform: translateY(-50%); z-index: 10;"/>
        </template>
      </navigation>
    </template>
  </carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';
import {Carousel, Navigation, Slide} from "vue3-carousel";
</script>