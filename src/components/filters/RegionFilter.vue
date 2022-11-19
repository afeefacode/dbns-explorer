<template>
  <q-select
    filled
    v-model="regionsRef"
    dense
    :options="regionNames"
    label="Region filtern"
  >
    <template v-slot:prepend>
      <q-icon name="location_on"/>
    </template>
  </q-select>
</template>
<script setup>
import {ref} from 'vue'
import {useCategoryStore} from 'src/stores/category-store'

const {regions} = useCategoryStore()

const regionsRef = ref(null)
const regionNames = regions.map(region => region.title)
</script>
