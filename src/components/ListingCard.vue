<script setup>
import Location from "../assets/icons/svg/location.vue";
import Bed from "../assets/icons/svg/bed.vue";
import Area from "../assets/icons/svg/area.vue";
import Zip from "../assets/icons/svg/zip.vue";

const props = defineProps({
  listing: {
    type: Object,
    required: true,
  }
})

const {
  image,
  price,
  address,
  city,
  bedrooms,
  area,
  zip_code,
  is_rental
} = props.listing
</script>


<template>
  <div class="flex flex-col  card_shadow rounded-[14px] cursor-pointer hover:scale-[102%] transition-transform duration-300">
    <div class="relative">
      <img class="h-[307px] object-cover rounded-t-[14px]" :src="image" alt="სურათი"/>
      <div class="absolute top-[22px] left-[22px] bg-[#02152680] rounded-[15px] w-[90px] text-center py-1.5">
        <p class="text-white text-[12px] ">{{is_rental===1?'ქირავდება':'იყიდება'}}</p>
      </div>
    </div>

    <div
        class="text-[#021526B2]  w-full px-[22px] py-[25px] flex flex-col gap-[20px] rounded-b-[14px] border border-bd_cl_0">

      <div class="flex flex-col">
        <div class="text-start text-[28px] text-[#021526] font-bold">{{ price }} ₾</div>
        <div class="flex items-center gap-[4px]">
          <location/>
          <p class=" text-[16px]">{{ city.name }}, {{ address }}</p>
        </div>
      </div>

      <div class="flex gap-[32px]">

        <div class="flex gap-[5px] items-center">
          <bed/>
          <div v-text="bedrooms"/>
        </div>

        <div class="flex gap-[5px] items-center">
          <Area/>
          <div>{{ area }} მ<sup>2</sup></div>
        </div>

        <div class="flex gap-[5px] items-center">
          <zip/>
          <div v-text="zip_code"/>
        </div>

      </div>

    </div>
  </div>
</template>


<style scoped>
.card_shadow {
  box-shadow: 5px 5px 12px 0px #02152614;
}
</style>