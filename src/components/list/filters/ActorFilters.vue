<template>
  <div>
    <div class="row q-gutter-md justify-center">
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          filled
          v-model="activeFilters.actors.orgTypes"
          dense
          :options="orgTypes"
          option-label="title"
          label="Organisationstyp"
          clearable
          :class="activeFilters.actors.orgTypes ? 'filter--active' : ''"
        >
          <template v-slot:prepend>
            <q-icon name="home_work"/>
          </template>
        </q-select>
      </div>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useFilterStore} from 'stores/filter-store'
import {useCategoryStore} from 'stores/category-store'

const filterStore = useFilterStore()
const categoryStore = useCategoryStore()

const {orgTypes} = categoryStore
const {activeFilters} = storeToRefs(filterStore)
</script>
