<template>
  <div class="row q-mt-xs justify-center">
    <q-expansion-item
      class="hide-expansion-header"
      v-model="hasActiveFilters"
      :duration="150"
    >
      <div class="q-gutter-sm">
        <div class="q-mb-sm">
          <q-btn label="Suchen" @click="fetchEntityLists(buttonForFilters)"></q-btn>
        </div>
      </div>
    </q-expansion-item>
  </div>
</template>
<script setup lang="ts">
import {defineProps} from 'vue'
import {storeToRefs} from "pinia/dist/pinia";
import {useBaseStore} from "src/stores/base-store";
import {useEntityStore} from "src/stores/entity-store";

const props = defineProps({
  buttonForFilters: {
    type: String,
    default: 'main'
  }
})

const baseStore = useBaseStore()
const {
  hasActiveFilters,
} = storeToRefs(baseStore)


const entityStore = useEntityStore()

const fetchEntityLists = (propsEntityType: string) => {
  baseStore.lastFilters = JSON.parse(JSON.stringify(baseStore.activeFilters))

  if (propsEntityType === 'main') {
    baseStore.activeEntities.forEach((entityType: string) => {
      entityStore.fetchEntityList(entityType)
    })
  } else {
    entityStore.fetchEntityList(propsEntityType)
  }
}
</script>
<style lang="scss" scoped>
.clear-filter-button {
  cursor: pointer;

  .q-icon {
    color: #999;
    margin-left: .3em;
    scale: 1.3;
  }
}

.clear-filter-button:hover {
  .text-button {
    text-decoration: none;
  }
}
</style>
