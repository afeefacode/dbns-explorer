<template>
  <q-page class="q-mb-xl">
    <!--    <h1 class="heading">{{ config.heading }}</h1>-->
    <!--    <p class="introduction">{{ config.introduction }}</p>-->
    <Filters @entity-selected="entitySelected"/>
    <MapListToggle @view-toggled="viewToggled" :active-view="activeView"/>
    <MapView v-if="activeView === 'map'"/>
    <ListView v-else/>
  </q-page>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useConfigStore} from 'src/stores/config-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/list-view/ListView.vue'
import MapListToggle from 'components/basic/MapListToggle.vue'
import {triggerIframeResize} from 'src/utils'

const config = useConfigStore().config
const activeView = ref('map')
const entitySelected = () => {
}
const viewToggled = (newView: string) => {
  activeView.value = newView
  setTimeout(triggerIframeResize, 200  )
}

onMounted(triggerIframeResize)

</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
