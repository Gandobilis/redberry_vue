<script setup>
import {onMounted, ref, watch, inject} from "vue";
import ListingCard from "./ListingCard.vue";
import {useRoute} from "vue-router";

const listings = inject('listings');
const getListings = inject('getListings')
const route = useRoute()
const query = ref({})
const filteredListings = ref()

onMounted(async () => {
  parseQuery()
  await getListings();
  applyFilters(listings.value);
  watch(listings, (nListings) => {
    applyFilters(nListings)
  })
})

import { useRouter } from 'vue-router'

const router = useRouter()

const goToListing = (id) => {
  router.push(`/listings/${id}`)
}

watch(route, () => {
  parseQuery()
  applyFilters(listings.value)
})

const parseQuery = () => {
  query.value = {
    regions: route.query.regions?.split(',') || [],
    minPrice: route.query.minPrice || null,
    maxPrice: route.query.maxPrice || null,
    minArea: route.query.minArea || null,
    maxArea: route.query.maxArea || null,
    bedroomCount: route.query.bedroomCount || null
  }
}

const applyFilters = (listings) => {
  filteredListings.value = listings.filter((listing) => {
    const isFilterApplied = query.value.regions.length || query.value.minPrice || query.value.maxPrice || query.value.minArea || query.value.maxArea || query.value.bedroomCount;

    if (!isFilterApplied) {
      return true;
    }

    const inRegion = query.value.regions.length ? query.value.regions.includes(String(listing.city.region.id)) : false;

    const inPriceRange = (query.value.minPrice || query.value.maxPrice)
        ? (!query.value.minPrice || listing.price >= query.value.minPrice) && (!query.value.maxPrice || listing.price <= query.value.maxPrice)
        : false;

    const inAreaRange = (query.value.minArea || query.value.maxArea)
        ? (!query.value.minArea || listing.area >= query.value.minArea) && (!query.value.maxArea || listing.area <= query.value.maxArea)
        : false;

    const matchesBedroomCount = query.value.bedroomCount ? listing.bedrooms === Number(query.value.bedroomCount) : false;

    return inRegion || inPriceRange || inAreaRange || matchesBedroomCount;
  });
};
</script>

<template>
  <div v-if="filteredListings" class="w-full grid grid-cols-4 gap-[20px] mt-[32px]">
    <ListingCard v-for="listing in filteredListings" :key="listing.id" :listing="listing" @click="goToListing(listing.id)" />
  </div>

  <!--  <Carousel v-if="listings" class="mt-10" :listings="listings"/>-->
  <div v-else>
    <h1 class="text-sm">იტვირთება...</h1>
  </div>
</template>

<style scoped>

</style>