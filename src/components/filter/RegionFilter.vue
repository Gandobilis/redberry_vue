<script setup>
import {inject, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";


const props = defineProps({
  closeDropdown: {
    required: true,
    type: Function
  }
})


const regions = inject('regions');
const router = useRouter();
const route = useRoute();
const checkedRegions = ref([]);

onMounted(() => {
  const queryRegions = route.query.regions;
  if (queryRegions) {
    checkedRegions.value = regions.value
        .filter(r => queryRegions.split(',').includes(String(r.id)))
  }
});

const toggleRegionSelection = (event) => {
  const region = JSON.parse(event.target.value);
  if (event.target.checked) {
    checkedRegions.value.push(region);
  } else {
    checkedRegions.value = checkedRegions.value.filter(r => r.id !== region.id);
  }
};

const applyFilter = () => {
  const {regions, ...query} = route.query
  if (checkedRegions.value.map(r => r.id).join(','))
    router.push({query: {...query, regions: checkedRegions.value.map(r => r.id).join(',')}});
  else
    router.push({query})
  props.closeDropdown()
};

defineExpose({
  applyFilter
})

const isRegionChecked = (region) => checkedRegions.value.some(r => r.id === region.id);

</script>

<template>
  <div class="flex flex-col gap-[24px]">
    <p class="text-tx_cl_0 text-[16px] font-medium">რეგიონის მიხედვით</p>
    <div class="flex flex-wrap gap-x-[50px] gap-y-[16px]  w-[679px] text-tx_cl_0">
      <div v-if="regions" v-for="(region, index) in regions" :key="index" class="flex gap-1 items-center w-[191px]">
        <input
            @change="toggleRegionSelection"
            :value="JSON.stringify(region)"
            :checked="isRegionChecked(region)"
            type="checkbox"
            class="w-[20px] h-[20px] border-bd_cl_0 custom_checkbox"
        />
        <div v-text="region.name" class="text-[14px]"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom_checkbox {
  accent-color: #45A849;
}
</style>
