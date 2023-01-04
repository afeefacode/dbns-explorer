<template>
  <div id='map' class="map"/>
  <div style="display:none"> entityListLoading: {{ entityListLoading }}</div>
  <div
    class="loading-overlay"
    v-if="entityListLoading"
  >
    <q-spinner color="white" size="3em"/>
  </div>
</template>
<script setup lang="ts">
import {onMounted, defineEmits, ref, onUpdated, defineProps, watch} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'

import pngMarkerActors from 'assets/markers/marker-actors.png'

import {useBaseStore} from "src/stores/base-store";
import {useEntityStore} from "src/stores/entity-store";
import {getTypeFromEntity, hasLatLong, isActiveEntity} from 'src/utils'
import {getMarkerPng} from 'src/utils/maplibre'

const props = defineProps({
  mapExpanded: {
    type: Boolean,
  }
})
const emit = defineEmits(['openDetails', 'closeDetails'])

watch(() => props.mapExpanded, () => {
  setTimeout(() => {
    map.resize()
  }, 150)
})

const entityStore = useEntityStore()
const {entityLists, entityListLoading} = storeToRefs(entityStore)

const baseStore = useBaseStore()
const config = baseStore.config

const activeMarker = ref(null)
let map: any

const resetMarkerStyle = (pngMarker: string) => {
  activeMarker.value.style.backgroundImage = `url(${pngMarkerActors})`
  activeMarker.value.style.zIndex = '0'
}

const createMarkerAndAdd = (entity: any) => {
  //console.log('adding marker')
  const marker = document.createElement('div')
  const entityType = getTypeFromEntity(entity)
  const markerPng = getMarkerPng(entityType)

  marker.className = `map__marker map__marker--${entityType}`
  marker.style.backgroundImage = `url(${markerPng.inactive})`
  marker.style.backgroundSize = 'contain'
  marker.style.backgroundRepeat = 'no-repeat'
  marker.style.width = '36px'
  marker.style.height = '50px'
  marker.style.top = '-25px'
  marker.style.cursor = 'pointer'
  marker.style.transition = 'width, height 100ms ease-in-out'

  marker.addEventListener('click', () => {
    if (activeMarker.value) {
      resetMarkerStyle()
    }

    activeMarker.value = marker

    marker.style.backgroundImage = `url(${markerPng.active})`
    marker.style.zIndex = '2'

    const offsetX = parseInt(map.getCanvas().style.width) / -4

    map.easeTo({
      center: [
        entity.locations[0].long,
        entity.locations[0].lat
      ],
      offset: [offsetX, 0]
    })

    emit('openDetails', entity)
  })

  new maplibregl.Marker(marker)
    .setLngLat([entity.locations[0].long, entity.locations[0].lat])
    .addTo(map)
}

const updateMap = () => {
  Object.keys(entityLists.value).forEach((entityType) => {
    if (entityLists.value[entityType]) {
      entityLists.value[entityType].forEach(entity => {
        if (hasLatLong(entity)) createMarkerAndAdd(entity)
      })
    }
  })
}


const updateBoundsAndFetch = () => {
  const bounds = map.getBounds()
  baseStore.activeFilters.boundingBox = {
    ne: {
      long: bounds._ne.lng,
      lat: bounds._ne.lat
    },
    sw: {
      long: bounds._sw.lng,
      lat: bounds._sw.lat
    }
  }

  const withBounds = true

  baseStore.activeEntities.forEach((entityType: string) => {
    entityStore.fetchEntityList(entityType, withBounds)
  })
}

onMounted(async () => {
  map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13, 51.15],
    zoom: 7
  });

  map.on('click', (event) => {
    const isClickOnMarker = event.originalEvent.target.classList[0].includes('marker')
    if (!isClickOnMarker) {
      resetMarkerStyle()
      emit('closeDetails', activeMarker)
    }
  });

  map.on('moveend', () => {
    updateBoundsAndFetch()
  })

  updateMap()
})

onUpdated(() => {
  updateMap()
})
</script>

<style lang="scss">
.map {
  height: 100%;
  width: 100%;
}

.search-button {
  position: absolute;
  top: 2em;
  left: 40%;
  background: #ffffff;
  z-index: 3;
  margin: auto;
  //display: none;
}

.loading-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  background: rgba(0, 0, 0, .3);
  z-index: 3;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .q-spinner {

  }
}
</style>
