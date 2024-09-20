<script setup>
import {ref} from "vue";
import CreateAgent from "/src/components/modals/CreateAgent.vue"

const show = ref(false)

const open = () => show.value = true
const close = () => show.value = false
</script>

<template>
  <div class="flex justify-between items-center">
    <div>

    </div>

    <div class="flex items-center gap-4">
      <button
          class="flex items-center gap-1 rounded-lg px-4 py-2.5 bg-[#F93B1D] border border-[#F93B1D] text-white font-medium hover:bg-[#DF3014]">
        <span class="text-xl">+</span> ლისტინგის დამატება
      </button>

      <button @click="open"
              class="flex items-center gap-1 rounded-lg px-4 py-2.5 border text-[#F93B1D] border-[#F93B1D] font-medium hover:bg-[#F93B1D] hover:text-white">
        <span class="text-xl">+</span> აგენტის დამატება
      </button>
    </div>

    <create-agent v-if="show" @close="close"/>
  </div>
</template>