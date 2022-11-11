<template>
  <q-page class="q-mb-xl">
    <Filters v-if="entityConfig.showFilters"/>
    <MapListToggle
      @view-toggled="viewToggled"
      :active-view="activeView"
      v-if="entityConfig.showListView && entityConfig.showMapView"
    />
    <MapView v-if="entityConfig.showMapView && activeView === 'map'"/>
    <ListView v-if="entityConfig.showListView && activeView === 'list'"/>
  </q-page>
</template>
<script setup lang="ts">
import {ref, watch, onUpdated} from 'vue'
import {useBaseStore} from 'stores/base-store'
import {useConfigStore} from 'stores/config-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/MapListToggle.vue'
import {useActorStore} from "stores/actor-store";



const baseStore = useBaseStore()
const config = useConfigStore().config

const activeEntity = baseStore.activeEntity
let entityConfig = config.entities.find(
  entity => entity.type === baseStore.activeEntity.substring(0, baseStore.activeEntity.length - 1)
)

console.log('entityConfig', entityConfig)

const actorStore = useActorStore()
actorStore.fetchActorList()


onUpdated(() => {
  console.log('update')
  console.log('baseStore.activeEntity', baseStore.activeEntity)
  entityConfig = config.entities.find(
    entity => entity.type === baseStore.activeEntity.substring(0, baseStore.activeEntity.length - 1)
  )
  console.log('entityConfig', entityConfig)

})

const activeView = entityConfig!.showMapView
  ? ref('map')
  : ref('list')

const viewToggled = (newView: string) => {
  activeView.value = newView
}
</script>
