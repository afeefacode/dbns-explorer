<template>
  <div class="entity-search">
    <q-input
      filled
      dense
      clearable
      v-model="activeFilters.main.search"
      label="Stichwortsuche"
      :class="activeFilters.main.search ? 'filter--active' : ''"
    >
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'stores/base-store'

const baseStore = useBaseStore()
const {activeFilters} = storeToRefs(baseStore)
</script>
