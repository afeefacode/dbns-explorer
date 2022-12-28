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
    <div v-if="config.showMainFilters">
      <q-expansion-item
        class="hide-expansion-header"
        v-model="baseStore.showFilters"
        :duration="150"
      >
        <AllFilters
          :mapViewActive="baseStore.entityConfig?.showMapView && mapViewToggled"
        />
      </q-expansion-item>
    </div>
    <div v-if="baseStore.entityConfig?.showMapView">
      <div class="row justify-end" v-if="activeEntities.length">
        <q-btn
          icon="map"
          flat
          :label="mapViewToggled ? 'Karte ausblenden' : 'Karte anzeigen'"
          @click="mapViewToggled = !mapViewToggled"
        />
      </div>
      <MapView
        v-show="mapViewToggled"
      />
    </div>
    <ListView
      v-if="baseStore.entityConfig?.showListView"
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
import {useCategoryStore} from "stores/category-store"
import {addToArrayOrRemove, isActiveEntity} from 'src/utils'

// components
import EntitySelector from 'src/components/list/filters/EntitySelector.vue'
import AllFilters from 'components/list/filters/AllFilters.vue'
import MapView from 'components/list/map-view/MapView.vue'
import ListView from 'components/ListView.vue'
import NoDataBackground from 'components/list/NoDataBackground.vue'


const baseStore = useBaseStore()
const entityStore = useEntityStore()
const categoryStore = useCategoryStore()

const {activeEntities} = storeToRefs(baseStore)
const config = baseStore.config

const mapViewToggled = ref(true)

const showEntitySelector = Object.keys(config.entities).length > 1

const onEntityClick = (entityType: string) => {
  baseStore.activeEntities = addToArrayOrRemove(baseStore.activeEntities, entityType)
  entityStore.fetchEntityList(entityType)
}

onUpdated(() => {
  //@ts-ignore
  entityStore.fetchEntityList(entityRequests[baseStore.activeEntity].list)

  // the 2 statements below handle the edge case when navigating from an
  // entity on listView to an entity with ONLY mapView (and vice versa)
  // if (!baseStore.entityConfig.showMapView && activeView.value === 'map') {
  //   activeView.value = 'list'
  // }
  // if (!baseStore.entityConfig.showListView && activeView.value === 'list') {
  //   activeView.value = 'map'
  // }
})

</script>
<style>
.entity-icons {
  justify-content: center;
}
</style>
