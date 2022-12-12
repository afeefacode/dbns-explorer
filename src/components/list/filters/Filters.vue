<template>
  <div class="q-pa-md"  @keydown.enter="fetchEntityLists">
    <div class="row q-gutter-md q-mb-md justify-center">
      <RegionFilter class="col-12 col-sm-6 col-md-4" v-if="categoryStore.regions"/>
      <CategoryFilter class="col-12 col-sm-6 col-md-4" v-if="categoryStore.mainCategories"/>
      <EntitySearch class="col-12 col-sm-6 col-md-3"/>
    </div>
    <q-expansion-item
      v-if="mapViewActive"
      class="additional-filters"
      v-model="additionalFiltersExpanded"
      :label="`weitere Filter ${additionalFiltersExpanded ? 'ausblenden' : 'einblenden'}`"
      :duration="150"
    >
      <div class="q-mb-lg">
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showActorFilters"
          :duration="150"
        >
          <div class="row justify-center text-h5 q-mb-xs">
            Akteure
          </div>
          <ActorFilters v-if="categoryStore.orgTypes"/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showEventFilters"
          :duration="150"
        >
          <div class="row justify-center text-h5 q-mt-lg q-mb-xs">
            Veranstaltungen
          </div>
          <EventFilters/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showStoreFilters"
          :duration="150"
        >
          <div class="row justify-center text-h5 q-mt-lg q-mb-xs">
            Handel
          </div>
          <StoreFilters v-if="categoryStore.tradeCategories && categoryStore.tradeTypes && categoryStore.productTypes"/>
        </q-expansion-item>
        <div v-if="!showAdditionalFilters" class="text-center">
          <i>Keine weiteren Filter vorhanden</i>
        </div>
      </div>
    </q-expansion-item>
    <ApplyFiltersButton :filterCategory="'main'"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'stores/base-store'
import {useCategoryStore} from 'stores/category-store'
import {useEntityStore} from 'stores/entity-store'
import ActorFilters from 'components/list/filters/ActorFilters.vue';
import CategoryFilter from 'components/list/filters/CategoryFilter.vue';
import RegionFilter from 'components/list/filters/RegionFilter.vue';
import EntitySearch from 'components/list/filters/EntitySearch.vue';
import EventFilters from 'components/list/filters/EventFilters.vue';
import StoreFilters from 'components/list/filters/StoreFilters.vue';
import ApplyFiltersButton from 'components/list/ApplyFiltersButton.vue'

const props = defineProps({
  mapViewActive: {
    type: Boolean,
    default: true
  }
})

const baseStore = useBaseStore()
const {
  hasActiveFilters,
  showAdditionalFilters,
  showActorFilters,
  showEventFilters,
  showStoreFilters,
  additionalFiltersExpanded,
} = storeToRefs(baseStore)

const categoryStore = useCategoryStore()

const entityStore = useEntityStore()

const fetchEntityLists = () => {
  baseStore.activeEntities.forEach((entityType: string) => {
    entityStore.fetchEntityList(entityType)
  })
}

const clearFiltersAndFetch = () => {
  baseStore.clearFilters()
  fetchEntityLists()
}
</script>
<style lang="scss">
.additional-filters {
  .q-expansion-item__container {
    .q-item__label {
      text-align: center;
      text-decoration: underline;
    }
  }

  .q-item__section--side {
    display: none;
  }
}

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
