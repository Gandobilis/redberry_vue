<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  closeDropdown: {
    required: true,
    type: Function
  }
})

const route = useRoute()
const router = useRouter()

const bedroomCount = ref(null)

onMounted(() => {
  bedroomCount.value = route.query.bedroomCount
})
const setCount = (event) => {
  bedroomCount.value = event.target.value
}

const applyFilter = () => {
  if (bedroomCount.value) {
    const query = {...route.query, bedroomCount: bedroomCount.value}
    router.push({query})
  }
  props.closeDropdown()
}

defineExpose({
  applyFilter
})
</script>

<template>
  <div class="flex flex-col gap-[24px] text-tx_cl_0 w-auto">
    <p class="font-medium text-[16px] min-w-[216px]">საძინებლების რაოდენობა</p>
    <input @input="setCount"
           :value="bedroomCount"
           class="border rounded-[6px] p-[10px] h-[42px] w-[42px] focus:outline-none border-bd_cl_1"
           type="number">
  </div>
</template>

<style scoped>

</style>