<template>
  <div class="row justify-center text-h5 q-mt-lg q-mb-xs">
    Handel
  </div>
  <div class="row q-gutter-md justify-center">
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="tradeCategoriesRef"
        dense
        :options="tradeCategoriesNames"
        label="Handelskategorien"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="tradeTypesRef"
        dense
        :options="tradeTypesNames"
        label="Handelstypen"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <q-select
        filled
        v-model="productTypesRef"
        dense
        :options="productTypesNames"
        label="Produkttypen"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="storefront"/>
        </template>
      </q-select>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useCategoryStore} from 'src/stores/category-store'

const {tradeCategories, tradeTypes, productTypes} = useCategoryStore()

const tradeCategoriesRef = ref(null)
const tradeCategoriesNames = tradeCategories.map(category => category.title)

const tradeTypesRef = ref(null)
const tradeTypesNames = tradeTypes.map(category => category.title)

const productTypesRef = ref(null)
const productTypesNames = productTypes.map(category => category.title)
</script>
