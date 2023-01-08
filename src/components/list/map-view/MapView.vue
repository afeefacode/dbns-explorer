<template>
  <div class="map-view">
    <div
      class="map-view__map-container"
    >
      <MapLibre
      />
      <DetailsDrawer
        v-if="activeMarker.entity"
        :entity="activeMarker.entity"
      />
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import MapLibre from 'components/list/map-view/MapLibre.vue'
import DetailsDrawer from 'components/list/map-view/DetailsDrawer.vue'

const baseStore = useBaseStore()

const {activeMarker} = storeToRefs(baseStore)
</script>
<style lang="scss" scoped>
.map-view {
  position: relative;

  &__map-container {
    transition: height 100ms ease-in-out;
    height: 600px;
  }
}

.map-placeholder {
  max-width: 1140px;
}

.filter-toggler {
  float: right;
  margin-right: 16px;
}
</style>
