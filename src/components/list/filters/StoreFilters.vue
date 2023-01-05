<template>
  <div>
    <div class="row q-gutter-md justify-center">
<!--      <div class="col-12 col-sm-6 col-md-3">-->
<!--        <q-select-->
<!--          filled-->
<!--          v-model="activeFilters.stores.tradeCategories"-->
<!--          dense-->
<!--          :options="tradeCategories"-->
<!--          option-label="title"-->
<!--          label="Handelskategorien"-->
<!--          clearable-->
<!--          :class="activeFilters.stores.tradeCategories ? 'filter&#45;&#45;active' : ''"-->
<!--        >-->
<!--          <template v-slot:prepend>-->
<!--            <q-icon name="storefront"/>-->
<!--          </template>-->
<!--        </q-select>-->
<!--      </div>-->
<!--      <div class="col-12 col-sm-6 col-md-3">-->
<!--        <q-select-->
<!--          filled-->
<!--          v-model="activeFilters.stores.tradeTypes"-->
<!--          dense-->
<!--          :options="tradeTypes"-->
<!--          option-label="title"-->
<!--          label="Handelstypen"-->
<!--          clearable-->
<!--          :class="activeFilters.stores.tradeTypes ? 'filter&#45;&#45;active' : ''"-->
<!--        >-->
<!--          <template v-slot:prepend>-->
<!--            <q-icon name="storefront"/>-->
<!--          </template>-->
<!--        </q-select>-->
<!--      </div>-->
      <div class="col-12 col-sm-6 col-md-3">
        <q-select
          filled
          v-model="activeFilters.stores.productTypes"
          dense
          :options="productTypes"
          option-label="title"
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
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'stores/base-store'
import {useCategoryStore} from 'stores/category-store'

const {tradeCategories, tradeTypes, productTypes} = useCategoryStore()

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
