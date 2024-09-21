<script setup>
import Mark from "/src/assets/Mark.vue";
import useListing from "/src/composables/useListing.js";
import {onMounted, ref, watch} from "vue";
import {useRegion} from "/src/composables/useRegion.js";
import DropDown from "/src/components/DropDown.vue";

const {
  regions,
  region,
  city,
  filteredCities,
  getRegionsAndCities
} = useRegion()

const {
  isRental,
  address,
  zipCode,
  regionId,
  cityId,
  price,
  area,
  bedrooms,
  description,
  agentId,
  fields,
  agents,
  file,
  preview,
  trigger,
  upload,
  remove,
  create,
  getAgents,
} = useListing()

onMounted(async () => {
  await getAgents();
  await getRegionsAndCities()
})

const agent = ref('აირჩიეთ აგენტი')

watch(region, (newRegion) => {
  city.value = 'აირჩიეთ ქალაქი'
  regionId.value = newRegion.id
})

watch(city, (newCity) => {
  cityId.value = newCity.id
})

watch(agent, (newAgent) => {
  agentId.value = newAgent.id
})
</script>

<template>
  <div class="flex flex-col gap-y-16 px-40">
    <p class="font-medium text-2xl text-center">ლისტინგის დამატება</p>

    <div class="flex flex-col gap-y-1.5">
      <p class="font-medium">გარიგების ტიპი</p>
      <div class="flex items-center gap-x-16">
        <label class="flex items-center gap-x-1 text-sm">
          <input type="radio" name="sale-type" v-model="isRental" value="0" checked> იყიდება
        </label>

        <label class="flex items-center gap-x-1 text-sm">
          <input type="radio" name="sale-type" v-model="isRental" value="1"> ქირავდება
        </label>
      </div>
    </div>

    <div class="flex flex-col gap-y-5">
      <p class="font-medium">მდებარობა</p>

      <div class="grid grid-cols-2 text-[#021526] gap-7">
        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">მისამართი *</span>

          <input type="text" v-model="address"
                 :style="{ borderColor: fields.address.border }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.address.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.address.color}"
                  v-text="fields.address.text"/>
          </div>
        </div>

        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">საფოსტო ინდექსი *</span>

          <input type="text" v-model="zipCode"
                 :style="{ borderColor: fields.zipCode.border }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.zipCode.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.zipCode.color}"
                  v-text="fields.zipCode.text"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 text-[#021526] gap-7">
        <drop-down :options="regions" title="რეგიონი" v-model="region" :border="fields.regionId.border"/>

        <drop-down :options="filteredCities" title="ქალაქი" v-model="city" :border="fields.cityId.border"/>
      </div>
    </div>

    <div class="flex flex-col gap-y-5">
      <p class="font-medium">ბინის დეტალები</p>

      <div class="grid grid-cols-2 text-[#021526] gap-7">
        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">ფასი *</span>

          <input type="text" v-model="price"
                 :style="{ borderColor: fields.price.border }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.price.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.price.color}"
                  v-text="fields.price.text"/>
          </div>
        </div>

        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">ფართობი *</span>

          <input type="text" v-model="area"
                 :style="{ borderColor: fields.area.border }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.area.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.area.color}"
                  v-text="fields.area.text"/>
          </div>
        </div>
      </div>

      <div class="grid text-[#021526] gap-7">
        <div class="flex flex-col gap-y-1.5 w-1/2">
          <span class="font-medium text-sm">საძინებლების რაოდენობა *</span>

          <input type="text" v-model="bedrooms"
                 :style="{ borderColor: fields.bedrooms.border }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.bedrooms.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.bedrooms.color}"
                  v-text="fields.bedrooms.text"/>
          </div>
        </div>
      </div>

      <div class="grid text-[#021526] gap-7">
        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">აღწერა *</span>

          <textarea type="text" v-model="description"
                    :style="{ borderColor: fields.description.border }"
                    class="rounded-md border p-2 focus:outline-0 resize-none h-32"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.description.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.description.color}"
                  v-text="fields.description.text"/>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-1.5 mt-10">
        <span class="font-medium text-sm">ატვირთეთ ფოტო *</span>

        <div
            :style="{borderColor: fields.picture.border}"
            class="w-full h-[120px] rounded-md border border-dashed flex items-center justify-center">
          <img v-if="!preview"
               src="/src/assets/icons/plus.svg"
               @click="trigger" alt="plus icon" class="cursor-pointer"/>
          <div v-else class="flex items-center gap-x-1.5 absolute" v-if="preview">
            <img :src="preview" alt="avatar" class="w-[92px] h-[82px] rounded">
            <img @click="remove" src="/src/assets/icons/can.svg" alt="can icon"
                 class="absolute -right-2 -bottom-2 cursor-pointer"/>
          </div>
        </div>
        <span class="text-sm" v-if="fields.picture.text" v-text="fields.picture.text"
              :style="{ color: fields.picture.color }"/>
        <input @change="upload" type="file" class="hidden" ref="file"/>
      </div>

      <drop-down class="w-2/5" :options="agents" title="აგენტი" v-model="agent" :border="fields.agentId.border"/>

      <div class="flex items-center gap-4 pt-14 justify-end">
        <router-link to="/"
                class="flex items-center gap-1 rounded-lg px-4 py-2.5 border text-[#F93B1D] border-[#F93B1D] font-medium hover:bg-[#F93B1D] hover:text-white">
          გაუქმება
        </router-link>

        <button @click="create"
                class="flex items-center gap-1 rounded-lg px-4 py-2.5 bg-[#F93B1D] border border-[#F93B1D] text-white font-medium hover:bg-[#DF3014]">
          დაამატე ლისტინგი
        </button>
      </div>
    </div>
  </div>
</template>