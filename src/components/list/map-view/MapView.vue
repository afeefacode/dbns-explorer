<template>
  <div class="map-view">
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
