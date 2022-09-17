<template>
  <div class="map-view">
    <!--    <LeafletMap/>-->
    <!--    <OpenLayersMap/>-->
    <MapLibre/>
  </div>
</template>
<script setup>
import {ref, onUpdated} from 'vue'
import {useActivitiesStore} from 'src/stores/activities-store'

// import LeafletMap from 'components/map-view/LeafletMap.vue'
// import OpenLayersMap from 'components/map-view/OpenLayersMap.vue'
import MapLibre from 'components/map-view/MapLibre.vue'

const detailsOpened = ref(true)

onUpdated(() => console.log('detailsOpened', detailsOpened))


const entity = useActivitiesStore().activities[1]

</script>
<style lang="scss" scoped>
.map-view {
  position: relative;
  margin-bottom: 2em;
}

.map-placeholder {
  max-width: 1140px;
}

.filter-toggler {
  float: right;
  margin-right: 16px;
}

</style>
