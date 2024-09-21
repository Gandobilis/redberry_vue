<script setup>
import Carousel from "./Carousel.vue";
import {inject, onMounted, ref, watch} from "vue";
import {useRoute} from "vue-router";
import Left from "../assets/icons/svg/left.vue";
import {useListings} from "../composables/useListings.js";
import Location from "../assets/icons/svg/location.vue";
import Area from "../assets/icons/svg/area.vue";
import Bed from "../assets/icons/svg/bed.vue";
import Zip from "../assets/icons/svg/zip.vue";
import X from "../assets/icons/svg/x.vue";

const {listing, getListing, deleteListing} = useListings()

const route = useRoute()
const listings = inject('listings')
const getListings = inject('getListings')

const regionListings = ref([])

watch(
    () => route.params.id,
    (newId, oldId) => {
      getListing(newId)
    }
)

onMounted(async () => {
  await getListings();
  await getListing(route.params.id);
  regionListings.value = listings.value.filter(l => l.city.region_id === listing.value.city.region_id)
})

const show = ref(false)
</script>

<template>
  <router-link to="/">
    <left/>
  </router-link>

  <div class="mt-7 grid grid-cols-2 gap-x-[68px]" v-if="listing">
    <div class="relative flex flex-col items-end gap-y-1.5">
      <img :src="listing.image" class="w-[839px] h-[670px] rounded-t-[14px]" alt="listing image">
      <div
          class="absolute top-[22px] left-[22px] bg-[#02152680] font-medium w-[142px] text-center py-1.5 rounded-[20px]">
        <p class="text-white text-[20px] ">{{ is_rental === 1 ? 'ქირავდება' : 'იყიდება' }}</p>
      </div>
      <span
          class="text-[#808A93]">{{
          `გამოქვეყნების თარიღი ${new Date(listing.created_at).toLocaleDateString('en-GB')}`
        }}</span>
    </div>

    <div class="w-[503px] flex flex-col gap-x-5 gap-y-10 h-[670px] justify-between">
      <p v-text="`${listing.price.toLocaleString().replace(/,/g, ', ')} ₾`"
         class="text-[#021526] font-bold text-[48px]"/>

      <div class="grid grid-rows-4 gap-y-3 text-[24px] text-[#808A93]">
        <div class="flex items-center gap-x-2.5">
          <location class="w-[22px]"/>
          <span v-text="`${listing.city.name}, ${listing.address}`"/></div>
        <div class="flex items-center gap-x-2.5">
          <Area class="w-[22px]"/>
          <span class="flex justify-end">{{ `ფართი ${listing.area} მ` }}<span class="text-[11px] ml-1">2</span></span>
        </div>
        <div class="flex items-center gap-x-2.5">
          <bed class="w-[22px]"/>
          <span v-text="`საძინებელი ${listing.bedrooms}`"/></div>
        <div class="flex items-center gap-x-2.5">
          <Zip class="w-[22px]"/>
          <span v-text="`საფოსტო ინდექს ${listing.zip_code}`"/>
        </div>
      </div>

      <p v-text="listing.description" class="text-[#808A93]"/>

      <div class="flex flex-col text-[#808A93] gap-y-2.5 py-6 px-5 rounded-[8px] border border-[#DBDBDB]">
        <div class="flex items-center gap-x-3">
          <img :src="listing.agent.avatar" class="w-16 aspect-square rounded-full" alt="avatar">
          <div class="flex flex-col justify-center">
            <p class="text-[#021526]" v-text="`${listing.agent.name} ${listing.agent.surname}`"/>
            <span class="text-sm">აგენტი</span>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <div class="flex items-center gap-x-1.5">
            <img src="/src/assets/icons/mail.svg" alt="mail">
            <span v-text="listing.agent.email" class="text-sm"/>
          </div>

          <div class="flex items-center gap-x-1.5">
            <img src="/src/assets/icons/phone.svg" alt="phone"/>
            <span v-text="listing.agent.phone" class="text-sm"/>
          </div>
        </div>
      </div>

      <button @click="show = true"
              class="font-medium text-[#676E76] text-[12px] rounded-[8px] border border-[#676E76] p-2.5 w-fit">
        ლისტინგის წაშლა
      </button>
    </div>
  </div>

  <carousel v-if="regionListings.length !==0" :listings="regionListings"/>

  <div class="fixed inset-0 bg-[#02152657] backdrop-blur-md flex items-center justify-center z-50" v-if="show">
    <div class="relative">
      <div class="bg-white p-16 rounded-[20px] shadow-lg py-[58px] px-[170px] flex flex-col gap-y-10">
        <p class="text-[20px] text-[#2D3648]">გსურთ წაშალოთ ლისტინგი?</p>

        <div class="flex items-center gap-4 justify-center">
          <button @click="show = false"
                  class="flex items-center gap-1 rounded-lg px-4 py-2.5 border text-[#F93B1D] border-[#F93B1D] font-medium hover:bg-[#F93B1D] hover:text-white">
            გაუქმება
          </button>

          <button @click="deleteListing(listing.id); show = false"
                  class="flex items-center gap-1 rounded-lg px-4 py-2.5 bg-[#F93B1D] border border-[#F93B1D] text-white font-medium hover:bg-[#DF3014]">
            დადასტურება
          </button>
        </div>
      </div>

      <x @click="show = false" class="absolute top-5 right-5 cursor-pointer"/>
    </div>
  </div>
</template>
