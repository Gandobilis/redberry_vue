<script setup>
import useAgent from "/src/composables/useAgent"
import Mark from "/src/assets/Mark.vue"

const {
  name,
  surname,
  email,
  phone,
  avatar,
  fields,
  file,
  preview,
  trigger,
  upload,
  remove,
  create
} = useAgent()

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white p-16 rounded-[10px] shadow-lg w-2/5">
      <p class="font-medium text-2xl text-center text-[#021526] pb-14">აგენტის დამატება</p>

      <div class="grid grid-cols-2 grid-rows-2 text-[#021526] gap-7">
        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">სახელი *</span>

          <input type="text" v-model="name" :style="{ borderColor: !fields.name.valid ? fields.name.color : '#021526' }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.name.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.name.color}"
                  v-text="fields.name.text"/>
          </div>
        </div>

        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">გვარი</span>

          <input type="text" v-model="surname"
                 :style="{ borderColor: !fields.surname.valid ? fields.surname.color : '#021526' }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.surname.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.surname.color}"
                  v-text="fields.surname.text"/>
          </div>
        </div>

        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">ელ-ფოსტა *</span>

          <input type="text" v-model="email"
                 :style="{ borderColor: !fields.email.valid ? fields.email.color : '#021526' }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.email.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.email.color}"
                  v-text="fields.email.text"/>
          </div>
        </div>

        <div class="flex flex-col gap-y-1.5">
          <span class="font-medium text-sm">ტელეფონის ნომერი</span>

          <input type="text" v-model="phone"
                 :style="{ borderColor: !fields.phone.valid ? fields.phone.color : '#021526' }"
                 class="rounded-md border p-2 focus:outline-0"/>

          <div class="flex items-center gap-x-1">
            <Mark :color="fields.phone.color"/>
            <span class="flex items-center gap-x-1 text-sm" :style="{color: fields.phone.color}"
                  v-text="fields.phone.text"/>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-1.5 mt-10">
        <span class="font-medium text-sm">ატვირთეთ ფოტო *</span>

        <div
            class="w-full h-[120px] rounded-md border border-dashed border-[#808A93] flex items-center justify-center">
          <img v-if="!preview"
               src="/src/assets/icons/plus.svg"
               @click="trigger" alt="plus icon" class="cursor-pointer"/>
          <div v-else class="flex items-center gap-x-1.5 absolute" v-if="preview">
            <img :src="preview" alt="avatar" class="w-[92px] h-[82px] rounded">
            <img @click="remove" src="/src/assets/icons/can.svg" alt="can icon"
                 class="absolute -right-2 -bottom-2 cursor-pointer"/>
          </div>
        </div>
        <span class="text-sm" v-if="fields.avatar.text" v-text="fields.avatar.text"
              :style="{ color: fields.avatar.color }"/>
        <input @change="upload" type="file" class="hidden" ref="file"/>
      </div>

      <span class="text-white text-sm mt-1"/>

      <div class="flex items-center gap-4 pt-14 justify-end">
        <button @click="close"
                class="flex items-center gap-1 rounded-lg px-4 py-2.5 border text-[#F93B1D] border-[#F93B1D] font-medium hover:bg-[#F93B1D] hover:text-white">
          გაუქმება
        </button>

        <button @click="create"
                class="flex items-center gap-1 rounded-lg px-4 py-2.5 bg-[#F93B1D] border border-[#F93B1D] text-white font-medium hover:bg-[#DF3014]">
          დაამატე აგენტი
        </button>
      </div>
    </div>
  </div>
</template>