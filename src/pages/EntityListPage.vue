<template>
  <q-page class="q-mb-xl">
    <div class="row entity-icons">
      <EntitySelector
        v-if="showEntitySelector"
        v-for="configEntity in config.entities"
        :entity-type="configEntity.type"
        :active="isActiveEntity(baseStore.activeEntities, configEntity.type)"
        @entity-click="onEntityClick(configEntity.type)"
      />
    </div>
    <div class="q-mb-md">
      <q-expansion-item
        class="hide-expansion-header"
        v-model="baseStore.showFilters"
        :duration="150"
      >
        <Filters/>
      </q-expansion-item>
    </div>
    <MapListToggle
      @view-toggled="viewToggled"
      :active-view="activeView"
      v-if="baseStore.entityConfig.showListView && baseStore.entityConfig.showMapView"
    />
    <MapView
      v-if="baseStore.entityConfig.showMapView && activeView === 'map'"
    />
    <ListView
      v-if="baseStore.entityConfig.showListView && activeView === 'list'"
      v-for="entityType in activeEntities"
      :entityType="entityType"
      :key="entityType"
    />
    <NoDataBackground v-if="!activeEntities.length"/>
  </q-page>
</template>
<script setup lang="ts">
// node_modules
import {ref, onUpdated} from 'vue'
import {storeToRefs} from 'pinia'

// utilities
import {entityRequests} from 'src/api/entityRequests'
import {useBaseStore} from 'stores/base-store'
import {useEntityStore} from "stores/entity-store"
import {addToArrayOrRemove, isActiveEntity} from 'src/utils'

// components
import EntitySelector from 'src/components/list/filters/EntitySelector.vue'
import Filters from 'components/list/filters/Filters.vue'
import MapView from 'components/list/map-view/MapView.vue'
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/list/MapListToggle.vue'
import NoDataBackground from 'components/list/NoDataBackground.vue'


const baseStore = useBaseStore()
const {activeEntities} = storeToRefs(baseStore)

const config = useBaseStore().config

const entityStore = useEntityStore()

const activeView = baseStore.entityConfig?.showMapView
  ? ref('map')
  : ref('list')

const viewToggled = (newView: string) => {
  activeView.value = newView
}
const showEntitySelector = Object.keys(config.entities).length > 1

const onEntityClick = (entityType: string) => {
  baseStore.activeEntities = addToArrayOrRemove(baseStore.activeEntities, entityType)
  entityStore.fetchEntityList(entityType)
}

onUpdated(() => {
  //@ts-ignore
  entityStore.fetchEntityList(entityRequests[baseStore.activeEntity].list)

  // the 2 statements below handle the edge case when navigation from an
  // entity on listView to an entity with ONLY mapView (and vice versa)
  if (!baseStore.entityConfig.showMapView && activeView.value === 'map') {
    activeView.value = 'list'
  }
  if (!baseStore.entityConfig.showListView && activeView.value === 'list') {
    activeView.value = 'map'
  }
})

</script>
<style>
.entity-icons {
  justify-content: center;
}
</style>
