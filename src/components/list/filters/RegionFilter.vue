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
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useFilterStore} from 'stores/filter-store'
import {useCategoryStore} from 'stores/category-store'

const filterStore = useFilterStore()
const categoryStore = useCategoryStore()

const {regions} = categoryStore
const {activeFilters} = storeToRefs(filterStore)
</script>
