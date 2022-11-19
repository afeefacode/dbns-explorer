<template>
    <q-select
      filled
      v-model="categoriesRef"
      dense
      :options="categoryNames"
      label="Kategorie filtern"
    >
      <template v-slot:prepend>
        <q-icon name="category"/>
      </template>
    </q-select>
</template>
<script setup>
import {ref} from 'vue'
import {useCategoryStore} from 'stores/category-store'

const {mainCategories} = useCategoryStore()
const categoriesRef = ref(null)
const categoryNames = mainCategories.map(category => category.title)
</script>
