<template>
  <div class="entity-search">
    <q-input
      filled
      dense
      clearable
      v-model="activeFilters.main.search"
      label="Stichwortsuche"
      @keyup="onSearchInput"
      :class="activeFilters.main.search ? 'filter--active' : ''"
    >
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {debounce, appendFiltersToRequest} from 'src/utils'
import {useBaseStore} from 'src/stores/base-store'
import {useEntityStore} from 'src/stores/entity-store'
import {entityRequests} from "src/api/entityRequests";

const entityStore = useEntityStore()
const baseStore = useBaseStore()

const {activeFilters} = storeToRefs(baseStore)

const searchInput = ref(null)
const onSearchInput = debounce(() => {
  const baseRequest = entityRequests[baseStore.activeEntity].list
  const filters = {
    "q": searchInput.value
  }

  const fullRequest = appendFiltersToRequest(baseRequest, filters)
  entityStore.fetchEntityList(fullRequest)
});
</script>
