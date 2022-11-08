<template>
    <q-select
      filled
      v-model="categoriesRef"
      dense
      :options="categoryNames"
      label="Kategorie filtern"
    >
      <template v-slot:prepend>
        <q-icon name="filter_alt"/>
      </template>
    </q-select>
</template>
<script setup>
import {ref} from 'vue'
import {categories} from 'assets/categories'

const categoriesRef = ref(null)
const categoryNames = categories.map(category => category.name)
</script>
