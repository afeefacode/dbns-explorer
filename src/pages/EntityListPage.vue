<template>
  <q-page class="q-mb-xl">
    <div class="row entity-icons">
      <EntitySelector
        v-if="showEntitySelector"
        v-for="configEntity in config.entities"
        :entity-type="configEntity.type"
        :active="isActiveEntity(filterStore.activeEntities, configEntity.type)"
        @entity-click="onEntityClick(configEntity.type)"
      />
    </div>
    <div v-if="config.showMainFilters" class="text-center">
      <q-btn
        :label="`Filter ${ filtersExpanded ? 'ausblenden' : 'anzeigen' }`"
        @click="filtersExpanded = !filtersExpanded"
        color="primary"
        flat
      />
      <q-expansion-item
        class="hide-expansion-header"
        v-model="baseStore.filtersExpanded"
        :duration="150"
      >
        <AllFilters
          :mapViewActive="baseStore.config?.showMapView  && activeView === 'map'"
        />
      </q-expansion-item>
    </div>
    <q-separator class="q-mt-md q-mb-lg"/>
    <div v-if="baseStore.config?.showMapView">
      <MapListToggle
        v-if="baseStore.config?.showListView && baseStore.config?.showMapView"
      />
      <MapView
        v-if="baseStore.config?.showMapView && activeView === 'map'"
      />
    </div>
    <ListView
      v-if="baseStore.config?.showListView && activeView === 'list'"
      v-for="entityType in activeEntities"
      :entityType="entityType"
      :key="entityType"
    />
    <NoDataBackground v-if="!activeEntities.length"/>
  </q-page>
</template>
<script setup lang="ts">
// node_modules
import {storeToRefs} from 'pinia'

// stores & utils
import {useBaseStore} from 'stores/base-store'
import {useFilterStore} from 'stores/filter-store'
import {useEntityStore} from "stores/entity-store"
import {addToArrayOrRemove, isActiveEntity} from 'src/utils'

// components
import EntitySelector from 'src/components/list/filters/EntitySelector.vue'
import AllFilters from 'components/list/filters/AllFilters.vue'
import MapView from 'components/list/map-view/MapView.vue'
import ListView from 'components/ListView.vue'
import NoDataBackground from 'components/list/NoDataBackground.vue'
import MapListToggle from 'components/list/MapListToggle.vue'

const baseStore = useBaseStore()
const filterStore = useFilterStore()
const entityStore = useEntityStore()

const {activeView, filtersExpanded} = storeToRefs(baseStore)
const {activeEntities, activeFilters} = storeToRefs(filterStore)
const config = baseStore.config

const showEntitySelector = Object.keys(config.entities).length > 1

const onEntityClick = (entityType: string) => {
  filterStore.activeEntities = addToArrayOrRemove(filterStore.activeEntities, entityType)
}

filterStore.$subscribe((mutation, state) => {
  filterStore.activeEntities.forEach((entityType: string) => {
    entityStore.fetchEntityList(entityType)
  })
})

</script>
<style>
.entity-icons {
  justify-content: center;
}
</style>
