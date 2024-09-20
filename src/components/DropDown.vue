<script setup>
defineProps({
  options: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  border: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-y-1.5 text-[#021526] text-sm">
    <label for="dropdown" class="font-medium" v-text="`${title} *`"/>

    <div class="relative">
      <select id="dropdown" v-model="model"
              :style="{'borderColor': border}"
              class="cursor-pointer w-full appearance-none bg-white border p-2.5 rounded-md focus:outline-none">
        <option disabled selected v-text="`აირჩიეთ ${title}`"/>
        <option v-for="(option, index) in options" :key="index" :value="option" v-text="option.name"/>
      </select>

      <span></span>

      <div class="absolute inset-y-0 right-0 flex items-center px-2">
        <img src="/src/assets/icons/caret.svg" alt="caret"/>
      </div>
    </div>
  </div>
</template>
