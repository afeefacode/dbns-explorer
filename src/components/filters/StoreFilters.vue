<template>
  <div class="row justify-center text-h5 q-mt-lg q-mb-xs">
    Handel
  </div>
  <div class="row q-gutter-md justify-center">
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="activeFilters.stores.tradeCategories"
        dense
        :options="tradeCategoriesNames"
        label="Handelskategorien"
        clearable
        :class="activeFilters.stores.tradeCategories ? 'filter--active' : ''"
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="activeFilters.stores.tradeTypes"
        dense
        :options="tradeTypesNames"
        label="Handelstypen"
        clearable
        :class="activeFilters.stores.tradeTypes ? 'filter--active' : ''"
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="activeFilters.stores.productTypes"
        dense
        :options="productTypesNames"
        label="Produkttypen"
        clearable
        :class="activeFilters.stores.productTypes ? 'filter--active' : ''"
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useCategoryStore} from 'src/stores/category-store'

const {tradeCategories, tradeTypes, productTypes} = useCategoryStore()

const tradeCategoriesNames = tradeCategories.map(category => category.title)
const tradeTypesNames = tradeTypes.map(category => category.title)
const productTypesNames = productTypes.map(category => category.title)

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
