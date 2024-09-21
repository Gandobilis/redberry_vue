<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  closeDropdown: {
    required: true,
    type: Function
  }
})

const predefined_prices = ref([
  50000, 100000, 150000, 200000, 300000
])

const router = useRouter()
const route = useRoute()

const maxPrice = ref(null)
const minPrice = ref(null)
const isNotValid = ref(false)

onMounted(() => {
  maxPrice.value = route.query.maxPrice
  minPrice.value = route.query.minPrice
})

const setMax = (event) => {
  isNotValid.value = false
  maxPrice.value = event.target.value
}
const setMin = (event) => {
  isNotValid.value = false
  minPrice.value = event.target.value
}

const checkValidity = () => {
  let [max, min] = [maxPrice.value, minPrice.value]
  return !(max && min && max < min);
}

const applyFilter = () => {
  const query = {}
  if (checkValidity()) {
    query.minPrice = minPrice.value || ''
    query.maxPrice = maxPrice.value || ''

    router.push({query: {...route.query, ...query}})
    props.closeDropdown()
  } else {
    isNotValid.value = true
  }
}
defineExpose({
  applyFilter
})

const classes = computed(()=>{
  return {
    inputBorder: isNotValid.value?'border-[#F93B1D]':'border-bd_cl_1',
    errorMessage: isNotValid.value?'opacity-1':'opacity-0'
  }
})

</script>

<template>
  <div class="flex flex-col gap-[24px] text-tx_cl_0">
    <p class="font-medium text-[16px]">ფასის მიხედვით</p>


    <div class="relative">
      <div class="flex gap-[15px]">

        <div class="relative">
          <input
              @input="setMin"
              :value="minPrice"
              :class="classes.inputBorder"
              class="ipt" type="number"
              placeholder="დან"/>
          <span class="custom-letter">₾</span>
        </div>

        <div class="relative">
          <input
              @input="setMax"
              :value="maxPrice"
              :class="classes.inputBorder"
              class="ipt" type="number"
              placeholder="მდე"/>
          <span class="custom-letter">₾</span>
        </div>

      </div>
      <p
          :class="classes.errorMessage"
          class="text-[#F93B1D] text-[12px] absolute bottom-[-20px]">
        ჩაწერეთ ვალიდური მონაცემები
      </p>
    </div>

    <div class="flex justify-between">
      <div class="w-[155px] flex flex-col gap-[16px]">
        <p class="font-medium text-[14px]">მინ. ფასი</p>
        <div>
          <p
              class="cursor-pointer"
              v-for="p in predefined_prices"
              @click="()=>minPrice=p">
            {{ p.toLocaleString() }} ₾
          </p>
        </div>
      </div>

      <div class="w-[155px] flex flex-col gap-[16px]">
        <p class="font-medium text-[14px]">მაქს. ფასი</p>
        <div>
          <p
              class="cursor-pointer"
              v-for="p in predefined_prices"
              @click="()=>maxPrice=p" >
            {{ p.toLocaleString() }} ₾
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.ipt {
  @apply w-[155px] border rounded-[6px] p-[10px] h-[42px] focus:outline-none
}
.custom-letter {
  @apply absolute right-[10px] top-[50%] translate-y-[-50%]
}
</style>
