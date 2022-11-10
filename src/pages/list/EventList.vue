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
import {onMounted, ref} from 'vue'
import {useConfigStore} from 'stores/config-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/MapListToggle.vue'

const config = useConfigStore().config
const entityConfig = config.entities.find(entity => entity.type === 'event')

const activeView = entityConfig!.showMapView
  ? ref('map')
  : ref('list')

const viewToggled = (newView: string) => {
  activeView.value = newView
}

const triggerIframeResize = () => {
  const appHeight = document.getElementById('q-app').scrollHeight
  const resizeMessage = {
    type: "app_resized",
    payload: appHeight
  }
  window.parent.postMessage(resizeMessage, '*')
}

onMounted(() => {
  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
})

</script>

<style lang="scss" scoped>

.introduction {
  margin-bottom: 2em;
}
</style>
