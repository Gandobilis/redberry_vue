<script setup>
import MainLayout from "./layouts/MainLayout.vue";

import {onMounted} from "vue";
import {useRegions} from "./composables/useRegions.js";
import {useListings} from "./composables/useListings.js";

const {getRegionsAndCities} = useRegions()
const { getListings } = useListings()

onMounted(async ()=>{
  await getRegionsAndCities()
  await getListings()
})
</script>

<template>
  <main-layout>
    <router-view/>
  </main-layout>
</template>