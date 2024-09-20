<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
</script>

<template>
  <header-component/>
  <main class="px-[162px] py-[38px]">
    <slot/>
  </main>
  <footer-component/>
</template>
