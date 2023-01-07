<template>
  <q-select
    filled
    v-model="activeFilters.main.category"
    dense
    :options="mainCategories"
    option-label="title"
    label="Kategorie"
    clearable
    :class="activeFilters.main.category ? 'filter--active' : ''"
  >
    <template v-slot:prepend>
      <q-icon name="category"/>
    </template>
  </q-select>
</template>
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useFilterStore} from 'stores/filter-store'
import {useCategoryStore} from 'stores/category-store'

const filterStore = useFilterStore()
const categoryStore = useCategoryStore()

const {mainCategories} = categoryStore
const {activeFilters} = storeToRefs(filterStore)
</script>
