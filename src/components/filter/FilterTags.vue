<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import X from "../../assets/icons/svg/x.vue";
import {useRegions} from "../../composables/useRegions.js";

const router = useRouter();
const route = useRoute();

const {regions, getRegionsAndCities} = useRegions()
const checkedRegions = ref([]);
const minPrice = ref('');
const maxPrice = ref('');
const minArea = ref('');
const maxArea = ref('');
const bedroomCount = ref('')

const updateCheckedRegions = () => {
  const queryRegions = route.query.regions;
  checkedRegions.value = queryRegions
      ? regions.value.filter(r => queryRegions.split(',').includes(String(r.id)))
      : [];
};

const updatePrice = () => {
  minPrice.value = route.query.minPrice ? `${route.query.minPrice} ₾` : '';
  maxPrice.value = route.query.maxPrice ? `${route.query.maxPrice} ₾` : '';
};

const updateArea = () => {
  minArea.value = route.query.minArea ? `${route.query.minArea} მ<sup>2</sup>` : '';
  maxArea.value = route.query.maxArea ? `${route.query.maxArea} მ<sup>2</sup>` : '';
};

const updateBedroomCount = () => {
  bedroomCount.value = route.query.bedroomCount ? route.query.bedroomCount : ''
}

onMounted(async () => {
  await getRegionsAndCities();
  watch(regions, (nregions) => {
    const queryRegions = route.query.regions;
    if (queryRegions) {
      checkedRegions.value = nregions
          .filter(r => queryRegions.split(',').includes(String(r.id)))
    }
  })
  updatePrice();
  updateArea();
  updateBedroomCount()
});

watch(route, () => {
  updateCheckedRegions();
  updatePrice();
  updateArea();
  updateBedroomCount()
});

const removeRegionTag = (id) => {
  const updatedRegions = checkedRegions.value
      .filter(r => r.id !== id)
      .map(r => r.id)
      .join(',');
  const {regions, ...query} = route.query
  if (updatedRegions)
    router.push({query: {...route.query, regions: updatedRegions}});
  else
    router.push({query})
};

const removePriceTag = () => {
  const {minPrice, maxPrice, ...query} = route.query;
  router.push({query});
};

const removeAreaTag = () => {
  const {minArea, maxArea, ...query} = route.query;
  router.push({query});
};

const removeBedroomTag = () => {
  const {bedroomCount, ...query} = route.query
  router.push({query});
}

const clear = () => {
  const {regions, minPrice, maxPrice, minArea, maxArea, bedroomCount, ...query} = route.query
  router.push({query});
}
</script>

<template>
  <div class="mt-[16px] flex gap-[10px] text-[14px] text-[#021526CC] leading-[16.8px]">
    <div v-for="{ name, id } in checkedRegions"
         class="px-[10px] py-[6px] flex gap-[5px] border border-bd_cl_0 rounded-[43px]">
      <div class="flex items-center">{{ name }}</div>
      <div @click="removeRegionTag(id)" class="flex items-center cursor-pointer">
        <x/>
      </div>
    </div>

    <div v-if="maxPrice || minPrice"
         class="px-[10px] py-[6px] flex gap-[5px] border border-bd_cl_0 rounded-[43px]">
      <div class="flex items-center">{{ `${minPrice} - ${maxPrice}` }}</div>
      <div @click="removePriceTag" class="flex items-center cursor-pointer">
        <x/>
      </div>
    </div>

    <div v-if="maxArea || minArea"
         class="px-[10px] py-[6px] flex gap-[5px] border border-bd_cl_0 rounded-[43px]">
      <div class="flex items-center" v-html="`${minArea} - ${maxArea}`"/>
      <div @click="removeAreaTag" class="flex items-center cursor-pointer">
        <x/>
      </div>
    </div>

    <div v-if="bedroomCount"
         class="px-[10px] py-[6px] flex gap-[5px] border border-bd_cl_0 rounded-[43px]">
      <div class="flex items-center" v-text="bedroomCount"/>
      <div @click="removeBedroomTag" class="flex items-center cursor-pointer">
        <x/>
      </div>
    </div>

    <div
        v-if="bedroomCount||maxArea||minArea||maxPrice||minPrice||checkedRegions.length !== 0"
        @click="clear"
        v-text="'გასუფთავება'"
        class="text-tx_cl_0 text-[14px] font-medium flex items-center cursor-pointer"/>
  </div>
</template>
