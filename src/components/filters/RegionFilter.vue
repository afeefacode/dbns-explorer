<template>
  <q-select
    filled
    v-model="activeFilters.main.region"
    dense
    :options="regionNames"
    label="Region"
    clearable
    :class="activeFilters.main.region ? 'filter--active' : ''"
  >
    <template v-slot:prepend>
      <q-icon name="location_on"/>
    </template>
  </q-select>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useCategoryStore} from 'src/stores/category-store'

const {regions} = useCategoryStore()
const regionNames = regions.map(region => region.title)

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
