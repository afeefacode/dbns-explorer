<template>
  <div class="entity-search">
    <q-input
      filled
      dense
      clearable
      v-model="searchInput"
      @change="onSearchInput"
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
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useFilterStore} from 'stores/filter-store'
import {debounce} from "src/utils";

const filterStore = useFilterStore()
const {activeFilters} = storeToRefs(filterStore)

const searchInput = ref(null)
const onSearchInput = debounce(() => {
  filterStore.activeFilters.main.search = searchInput.value
});
</script>
