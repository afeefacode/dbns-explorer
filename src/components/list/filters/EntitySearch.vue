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
<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useFilterStore} from 'stores/filter-store'

const filterStore = useFilterStore()
const {activeFilters} = storeToRefs(filterStore)
</script>
