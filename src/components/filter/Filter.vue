<script setup>
import FilterButton from "./FilterButton.vue";
import {RegionFilter, PriceFilter, AreaFilter, BedroomFilter,FilterTags} from "./index.js";
import CreateAgent from "../modals/CreateAgent.vue";
import {ref} from "vue";

const filters = [
  {title: 'რეგიონი', component: RegionFilter},
  {title: 'საფასო კატეგორია', component: PriceFilter},
  {title: 'ფართობი', component: AreaFilter},
  {title: 'საძინებლების რაოდენობა', component: BedroomFilter}
]



const show = ref(false)

const open = () => show.value = true
const close = () => show.value = false
</script>

<template>
  <div class="flex justify-between mt-8 text-[#ffffff] ">

    <div class="flex gap-[24px] w-auto p-[6px] border border-bd_cl_0 rounded-[10px]">
      <FilterButton v-for="({title,component},i) in filters" :id="i" :title="title" :component="component"/>
    </div>

    <div class="flex items-center gap-4">
      <router-link to="/create-listing"
                   class="flex items-center gap-1 rounded-lg px-4 py-2.5 bg-[#F93B1D] border border-[#F93B1D] text-white font-medium hover:bg-[#DF3014]">
        <span class="text-xl">+</span> ლისტინგის დამატება
      </router-link>

      <button @click="open"
              class="flex items-center gap-1 rounded-lg px-4 py-2.5 border text-[#F93B1D] border-[#F93B1D] font-medium hover:bg-[#F93B1D] hover:text-white">
        <span class="text-xl">+</span> აგენტის დამატება
      </button>
    </div>

    <create-agent v-if="show" @close="close"/>

  </div>

  <FilterTags/>

</template>
