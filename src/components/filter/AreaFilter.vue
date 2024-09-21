<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  closeDropdown: {
    required: true,
    type: Function
  }
})

const predefined_areas = ref([
  50, 100, 150, 200, 300
])

const router = useRouter()
const route = useRoute()

const maxArea = ref(null)
const minArea = ref(null)
const isNotValid = ref(false)

onMounted(() => {
  maxArea.value = route.query.maxArea
  minArea.value = route.query.minArea
})

const setMax = (event) => {
  isNotValid.value = false
  maxArea.value = event.target.value
}
const setMin = (event) => {
  isNotValid.value = false
  minArea.value = event.target.value
}

const checkValidity = () => {
  let [max, min] = [maxArea.value, minArea.value]
  return !(max && min && max < min);
}

const applyFilter = () => {
  const query = {}
  if (checkValidity()) {
    query.minArea = minArea.value || ''
    query.maxArea = maxArea.value || ''

    router.push({query: {...route.query, ...query}})
    props.closeDropdown()
  } else {
    isNotValid.value = true
  }
}
defineExpose({
  applyFilter
})

const classes = computed(() => {
  return {
    inputBorder: isNotValid.value ? 'border-[#F93B1D]' : 'border-bd_cl_1',
    errorMessage: isNotValid.value ? 'opacity-1' : 'opacity-0'
  }
})

</script>

<template>
  <div class="flex flex-col gap-[24px] text-tx_cl_0">
    <p class="font-medium text-[16px]">ფართობის მიხედვით</p>


    <div class="relative">
      <div class="flex gap-[15px]">

        <div class="relative">
          <input
              @input="setMin"
              :value="minArea"
              :class="classes.inputBorder"
              class="ipt" type="number"
              placeholder="დან"/>
          <span class="custom-letter">მ<sup>2</sup></span>
        </div>

        <div class="relative">
          <input
              @input="setMax"
              :value="maxArea"
              :class="classes.inputBorder"
              class="ipt" type="number"
              placeholder="მდე"/>
          <span class="custom-letter">მ<sup>2</sup></span>
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
        <p class="font-medium text-[14px]">მინ. მ<sup>2</sup></p>
        <div>
          <p
              class="cursor-pointer"
              v-for="p in predefined_areas"
              @click="()=>minArea=p">
            {{ p.toLocaleString() }} მ<sup>2</sup>
          </p>
        </div>
      </div>

      <div class="w-[155px] flex flex-col gap-[16px]">
        <p class="font-medium text-[14px]">მაქს. მ<sup>2</sup></p>
        <div>
          <p
              class="cursor-pointer"
              v-for="p in predefined_areas"
              @click="()=>maxArea=p">
            {{ p.toLocaleString() }} მ<sup>2</sup>
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
