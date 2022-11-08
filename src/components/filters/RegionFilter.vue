<template>
    <q-select
      filled
      v-model="regionsRef"
      dense
      :options="regionNames"
      label="Region filtern"
    >
      <template v-slot:prepend>
        <q-icon name="filter_alt"/>
      </template>
    </q-select>
</template>
<script setup>
import {ref} from 'vue'
import {regions} from 'assets/regions'

const regionsRef = ref(null)
const regionNames = regions.map(region => region.name)
</script>
