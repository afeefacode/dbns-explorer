<template>
    <q-select
      filled
      v-model="activeFilters.main.category"
      dense
      :options="categoryNames"
      label="Kategorie filtern"
      clearable
      :class="activeFilters.main.category ? 'filter--active' : ''"
    >
      <template v-slot:prepend>
        <q-icon name="category"/>
      </template>
    </q-select>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useCategoryStore} from 'src/stores/category-store'

const {mainCategories} = useCategoryStore()
const categoryNames = mainCategories.map(category => category.title)

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
