<script setup>
import Arrow from "../../assets/icons/svg/arrow.vue";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  component: {
    required: true
  }
})

const isOpen = ref(false)
const button = ref(null)
const dropdown = ref(null)
const child = ref(null)


const arrowClass = computed(() => isOpen.value ? 'rotate-180' : '')

const closeDropdown = () => {
  isOpen.value = false
}
const applyFilter = () => {
  if (child.value) {
    child.value.applyFilter()
  }
}
const toggleRotation = () => {
  isOpen.value = !isOpen.value
}
const handleClickOutside = (event) => {
  if (isOpen.value && button.value && !button.value.contains(event.target) &&
      dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative">

    <div @click="toggleRotation" ref="button"
         :class="isOpen?'bg-bg_btn_0':''"
         class="cursor-pointer flex justify-center items-center gap-[4px] px-[14px] py-[8px] rounded-[6px] transition-colors duration-300">
      <div class="font-medium text-[16px] text-tx_cl_0" v-text="props.title"/>
      <arrow :class="arrowClass" class="transition-transform duration-300"/>
    </div>

    <Transition>
      <div ref="dropdown" v-if="isOpen"
           class="z-10 transition-all duration-300 bg-[#ffffff] absolute top-[55px] left-0 p-[24px] border border-bd_cl_0 rounded-[10px] custom_shadow">

        <component v-if="component" ref="child" :is="props.component" :closeDropdown="closeDropdown"/>

        <div class="flex justify-end mt-[32px]">
          <button
              @click="applyFilter"
              class="text-white text-[14px] font-medium bg-cl_main px-[14px] py-[8px] rounded-[8px] hover:bg-cl_main_h transition-colors duration-300"
          >
            არჩევა
          </button>
        </div>

      </div>
    </Transition>

  </div>
</template>


<style scoped>
.custom_shadow{
  box-shadow: 5px 5px 12px 0px rgba(2, 21, 38, 0.08);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>