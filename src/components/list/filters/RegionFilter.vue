<template>
  <q-select
    filled
    v-model="activeFilters.main.region"
    dense
    :options="regions"
    option-label="title"
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
import {useBaseStore} from 'stores/base-store'
import {useCategoryStore} from 'stores/category-store'

const {regions} = useCategoryStore()

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
