<template>
  <div class="q-gutter-sm row q-mb-lg">
    <q-select
      filled
      v-model="categoriesRef"
      dense
      :options="categoryNames"
      label="Kategorie wählen..."
      class="col-xs-12 col-sm-3"
    >
      <template v-slot:prepend>
        <q-icon name="filter_alt"/>
      </template>
    </q-select>

  </div>
</template>
<script setup>
import {ref} from 'vue'
import {categories} from 'assets/categories'

const categoriesRef = ref(null)
const categoryNames = categories.map(category => category.name)
</script>
