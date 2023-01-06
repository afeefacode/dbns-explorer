<template>
  <div class="row q-mt-xs justify-center">
<!--    <q-expansion-item-->
<!--      class="hide-expansion-header"-->
<!--      v-model="mainFiltersChanged"-->
<!--      :duration="150"-->
<!--    >-->
      <div class="q-gutter-sm">
        <div class="q-mb-sm">
          <q-btn label="Suchen" @click="fetchEntityLists(filterGroup)"></q-btn>
        </div>
      </div>
<!--    </q-expansion-item>-->
  </div>
</template>
<script setup lang="ts">
import {defineProps, ref, onUpdated} from 'vue'
import {storeToRefs} from "pinia/dist/pinia";
import {useBaseStore} from "src/stores/base-store";
import {useEntityStore} from "src/stores/entity-store";

const props = defineProps({
  filterGroup: {
    type: String,
    default: 'main'
  }
})

const baseStore = useBaseStore()

// const {
//   mainFiltersChanged,
//   eventFiltersChanged
// } = storeToRefs(baseStore)

const entityStore = useEntityStore()

// let showButton

// switch (props.filterGroup) {
//   case 'main':
//     showButton = mainFiltersChanged
//     break;
//   case 'events':
//     showButton = eventFiltersChanged
//     break;
// }

const fetchEntityLists = (filterGroup: string) => {
  baseStore.lastFilters = JSON.parse(JSON.stringify(baseStore.activeFilters))

  if (filterGroup === 'main') {
    baseStore.activeEntities.forEach((entityType: string) => {
      entityStore.fetchEntityList(entityType)
    })
  } else {
    entityStore.fetchEntityList(filterGroup)
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
