<template>
  <div class="map-view">
    <div
      class="map-view__map-container"
    >
      <MapLibre
        @openDetails="openDetails"
        @closeDetails="closeDetails"
      />
      <DetailsDrawer
        v-if="activeEntity"
        :entity="activeEntity"
        @closeDetails="closeDetails"
      />
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import MapLibre from 'components/list/map-view/MapLibre.vue'
import DetailsDrawer from 'components/list/map-view/DetailsDrawer.vue'

const activeEntity = ref(null)

const openDetails = (entity) => {
  activeEntity.value = entity
}

const closeDetails = () => {
  activeEntity.value = null
}
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
