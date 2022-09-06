<template>
  <div class="q-gutter-sm row q-mb-lg">
    <q-select
      filled
      v-model="regionsRef"
      dense
      :options="regionNames"
      label="Region wählen..."
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
import {regions} from 'assets/regions'

const regionsRef = ref(null)
const regionNames = regions.map(region => region.name)
</script>
