<template>
  <q-page class="q-mb-xl">
    <Filters v-if="baseStore.entityConfig?.showFilters"/>
    <!--    <MapListToggle-->
    <!--      @view-toggled="viewToggled"-->
    <!--      :active-view="activeView"-->
    <!--      v-if="baseStore.entityConfig.showListView && baseStore.entityConfig.showMapView"-->
    <!--    />-->
    <!--    <MapView v-if="baseStore.entityConfig.showMapView && activeView === 'map'"/>-->
    <!--    <ListView v-if="baseStore.entityConfig.showListView && activeView === 'list'"/>-->
    <ListView/>
  </q-page>
</template>
<script setup lang="ts">
import {ref, onUpdated} from 'vue'
import {useBaseStore} from 'stores/base-store'
import {useEntityStore} from "stores/entity-store"
import Filters from 'components/filters/Filters.vue'
import MapView from 'components/map-view/MapView.vue'
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/MapListToggle.vue'
import {entityRequests} from 'src/api/entityRequests'

const baseStore = useBaseStore()
const config = useBaseStore().config

const entityStore = useEntityStore()
//@ts-ignore
entityStore.fetchEntityList(entityRequests[baseStore.activeEntity].list)

const activeView = baseStore.entityConfig?.showMapView
  ? ref('map')
  : ref('list')

const viewToggled = (newView: string) => {
  activeView.value = newView
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
