<script setup>
import HeaderComponent from "/src/components/HeaderComponent.vue";
import FooterComponent from "/src/components/FooterComponent.vue";
</script>

<template>
  <header-component/>
  <main class="px-[162px] py-[38px]">
    <slot/>
  </main>
  <footer-component/>
</template>
