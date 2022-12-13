<template>
  <div class="map-view">
    <div
      class="map-view__map-container"
      :style="`height: ${mapExpanded ? 600 : 300}px; position: relative`"
    >
      <MapLibre
        @openDetails="openDetails"
        @closeDetails="closeDetails"
        :mapExpanded="mapExpanded"
      />
      <DetailsDrawer
        v-if="activeEntity"
        :entity="activeEntity"
        @closeDetails="closeDetails"
      />
    </div>
    <div class="row justify-end">
      <q-btn
        :icon="mapExpanded ? 'unfold_less' : 'unfold_more'"
        flat
        :label="mapExpanded ? 'Karte verkleinern' : 'Karte vergrößern'"
        @click="mapExpanded = !mapExpanded"
      />
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import MapLibre from 'components/list/map-view/MapLibre.vue'
import DetailsDrawer from 'components/list/map-view/DetailsDrawer.vue'

const activeEntity = ref(null)
const mapExpanded = ref(false)

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
