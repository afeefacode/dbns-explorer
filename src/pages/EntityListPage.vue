<template>
  <q-page class="q-mb-xl">
    <div class="row entity-icons">
      <EntitySelector
        v-if="showEntitySelector"
        v-for="entity in config.entities"
        :entity-type="entity.type"
        :active="isActiveEntity(activeEntities, entity.type)"
        @entity-click="onEntityClick(entity.type)"
      />
    </div>
    <div class="q-mb-md">
      <q-expansion-item
        class="hide-expansion-header"
        v-model="showFilters"
        :duration="150"
      >
        <Filters/>
      </q-expansion-item>
    </div>
    <!--    <MapListToggle-->
    <!--      @view-toggled="viewToggled"-->
    <!--      :active-view="activeView"-->
    <!--      v-if="baseStore.entityConfig.showListView && baseStore.entityConfig.showMapView"-->
    <!--    />-->
    <!--    <MapView v-if="baseStore.entityConfig.showMapView && activeView === 'map'"/>-->
    <!--    <ListView v-if="baseStore.entityConfig.showListView && activeView === 'list'"/>-->
    <ListView v-for="entityType in activeEntities" :entityType="entityType"/>
  </q-page>
</template>
<script setup lang="ts">
import {ref, onUpdated} from 'vue'
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {entityRequests} from 'src/api/entityRequests'
import {useBaseStore} from 'stores/base-store'
import {useEntityStore} from "stores/entity-store"
import EntitySelector from 'src/components/filters/EntitySelector.vue'
import Filters from 'components/filters/Filters.vue'
import MapView from 'components/map-view/MapView.vue'
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/MapListToggle.vue'
import {isActiveEntity} from 'src/utils'


const baseStore = useBaseStore()
const config = useBaseStore().config

const {activeEntities, showFilters} = storeToRefs(baseStore)

const entityStore = useEntityStore()
//@ts-ignore
entityStore.fetchEntityList(entityRequests[baseStore.activeEntity].list)

const activeView = baseStore.entityConfig?.showMapView
  ? ref('map')
  : ref('list')

const viewToggled = (newView: string) => {
  activeView.value = newView
}
const router = useRouter()
const showEntitySelector = Object.keys(config.entities).length > 1

const onEntityClick = (entityType: string) => {
  if (isActiveEntity(baseStore.activeEntities, entityType)) {
    const index = baseStore.activeEntities.findIndex(activeEntity => activeEntity === entityType)
    baseStore.activeEntities.splice(index, 1)
  } else {
    baseStore.activeEntities.unshift(entityType)
    // fetch entities
  }
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
