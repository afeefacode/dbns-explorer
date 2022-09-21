<template>
  <q-page>
    <div>
      <h1 class="heading">{{ config.heading }}</h1>
      <p class="introduction">{{ config.introduction }}</p>
      <Filters @entity-selected="entitySelected"/>
      <MapListToggle @view-toggled="viewToggled" :active-view="activeView"/>
      <MapView v-if="activeView === 'map'"/>
      <ListView v-else/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useConfigStore} from 'src/stores/config-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/list-view/ListView.vue'
import MapListToggle from 'components/basic/MapListToggle.vue'

const config = useConfigStore().config
const activeView = ref('map')
const entitySelected = () => {}
const viewToggled = (newView: string) => {
  activeView.value = newView
}

</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
