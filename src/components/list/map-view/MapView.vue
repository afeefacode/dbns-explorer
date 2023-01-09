<template>
  <div class="map-view">
    <div
      :class="`
      map-view__map-container
      ${entityListLoading ?  'map-view__map-container--loading' : ''}
      `"
    >
      <MapLibre/>
      <DetailsDrawer
        v-if="activeMarker.entity"
        :entity="activeMarker.entity"
      />
    </div>
<!--    <div class="text-center q-mt-lg">-->
    <!--      <q-btn-->
    <!--        label="Filter zurücksetzen"-->
    <!--        @click="clearFilters"-->
    <!--        icon-right="cancel"-->
    <!--        color=""-->
    <!--        flat-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useFilterStore} from 'src/stores/filter-store'
import {useEntityStore} from "stores/entity-store";
import MapLibre from 'components/list/map-view/MapLibre.vue'
import DetailsDrawer from 'components/list/map-view/DetailsDrawer.vue'
import {emptyFilters} from 'src/utils'

const baseStore = useBaseStore()
const filterStore = useFilterStore()
const entityStore = useEntityStore()

const {entityListLoading} = storeToRefs(entityStore)
const {activeMarker} = storeToRefs(baseStore)

// navigator.geolocation.getCurrentPosition(position => {
//   console.log('position', position)
// })

// const clearFilters = () => {
//   filterStore.activeFilters.value = emptyFilters
//   baseStore.config.entities.forEach((entity) => {
//     filterStore.activeEntities.push(entity.type)
//   })
// }
</script>
<style lang="scss" scoped>
.map-view {
  position: relative;

  &__map-container {
    height: 600px;

    &--loading {
      animation: loadingAnimation 1s alternate infinite ease-out;
    }
  }
}

@keyframes loadingAnimation {
  from {
    filter: brightness(.8);
  }
  to {
    filter: brightness(.6);
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
