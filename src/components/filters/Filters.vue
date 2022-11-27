<template>
  <div class="q-pa-md q-mb-md">
    <div class="row q-gutter-md q-mb-md justify-center">
      <RegionFilter class="col-12 col-sm-6 col-md-4" v-if="categoryStore.regions"/>
      <CategoryFilter class="col-12 col-sm-6 col-md-4" v-if="categoryStore.mainCategories"/>
      <EntitySearch class="col-12 col-sm-6 col-md-3"/>
    </div>
    <q-expansion-item
      class="additional-filters"
      v-model="additionalFiltersExpanded"
      :label="`Weitere Filter ${additionalFiltersExpanded ? 'ausblenden' : 'einblenden'}`"
      :duration="150"
    >
      <div class="q-mb-lg">
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showActorFilters"
          :duration="150"
        >
          <ActorFilters v-if="categoryStore.orgTypes"/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showEventFilters"
          :duration="150"
        >
          <EventFilters/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showStoreFilters"
          :duration="150"
        >
          <StoreFilters v-if="categoryStore.tradeCategories && categoryStore.tradeTypes && categoryStore.productTypes"/>
        </q-expansion-item>
        <div v-if="!showAdditionalFilters" class="text-center">
          <i>Keine weiteren Filter vorhanden</i>
        </div>
      </div>
    </q-expansion-item>
    <div class="row q-mt-xs justify-center">
      <q-expansion-item
        class="hide-expansion-header"
        v-model="hasActiveFilters"
        :duration="150"
      >
        <div class="q-gutter-sm">
          <div class="q-mb-lg">
            <q-btn label="Filter anwenden" @click="fetchEntities"></q-btn>
          </div>
          <div class="text-center clear-filter-button" @click="baseStore.clearFilters()">
            alle Filter löschen
          </div>
        </div>
      </q-expansion-item>
    </div>
  </div>

  <div class="q-px-lg">
    <q-separator/>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useCategoryStore} from 'src/stores/category-store'
import {useEntityStore} from 'src/stores/entity-store'
import ActorFilters from 'components/filters/ActorFilters.vue';
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';
import EventFilters from 'components/filters/EventFilters.vue';
import StoreFilters from 'components/filters/StoreFilters.vue';

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

const fetchEntities = () => {
  console.log('fetching')
    baseStore.activeEntities.forEach((entityType: string) => {
        entityStore.fetchEntityList(entityType)
    })
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
  text-decoration: underline;
  cursor: pointer;
}
</style>
