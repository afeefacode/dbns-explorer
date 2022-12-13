<template>
  <div>
    <div class="row q-gutter-md justify-center">
      <div class="col-12 col-sm-6 col-md-4">
        <q-select
          filled
          v-model="activeFilters.actors.orgTypes"
          dense
          :options="orgTypeNames"
          label="Organisationstyp"
          clearable
          :class="activeFilters.stores.tradeCategories ? 'filter--active' : ''"
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
import {useBaseStore} from 'stores/base-store'
import {useCategoryStore} from 'stores/category-store'

const {orgTypes} = useCategoryStore()
const orgTypeNames = orgTypes?.map(category => category.title)

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
