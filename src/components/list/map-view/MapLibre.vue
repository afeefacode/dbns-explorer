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
import {useFilterStore} from "src/stores/filter-store";
import {useEntityStore} from "src/stores/entity-store";
import {debounce, getTypeFromEntity, hasLatLong, isActiveEntity} from 'src/utils'
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

const filterStore = useFilterStore()
const {activeEntities} = storeToRefs(filterStore)

let map: any
const markers: any[] = []
const activeMarker = ref(null)

const resetMarkerStyle = () => {
  activeMarker.value.style.backgroundImage = `url(${pngMarkerActors})`
  activeMarker.value.style.zIndex = '0'
}

const loopActiveEntities = (callback: Function) => {
  Object.keys(entityLists.value).forEach((entityType) => {
    if (isActiveEntity(activeEntities.value, entityType)) {
      if (entityLists.value[entityType]) {
        entityLists.value[entityType].forEach(callback)
      }
    }
  })
}

const addEntityToMarkerArray = (entity: any) => {
  if (!(markers.findIndex(marker => marker.entity.id === entity.id) === -1)) return

  const entityType = getTypeFromEntity(entity)
  const markerPng = getMarkerPng(entityType)

  const domElement = document.createElement('div')
  domElement.style.backgroundImage = `url(${markerPng.inactive})`
  domElement.style.backgroundSize = 'contain'
  domElement.style.backgroundRepeat = 'no-repeat'
  domElement.style.width = '36px'
  domElement.style.height = '50px'
  domElement.style.top = '-25px'
  domElement.style.cursor = 'pointer'

  domElement.addEventListener('click', () => {
    if (activeMarker.value) {
      resetMarkerStyle(markerPng.inactive)
    }

    activeMarker.value = domElement

    domElement.style.backgroundImage = `url(${markerPng.active})`
    domElement.style.zIndex = '2'

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

  const libreMarker = new maplibregl.Marker(domElement)
    .setLngLat([entity.locations[0].long, entity.locations[0].lat])

  const mapMarker = {
    entity,
    domElement,
    libreMarker,
    visible: true
  }

  markers.push(mapMarker)
}

const updateBounds = () => {
  const bounds = map.getBounds()
  filterStore.activeFilters.boundingBox = {
    ne: {
      long: bounds._ne.lng,
      lat: bounds._ne.lat
    },
    sw: {
      long: bounds._sw.lng,
      lat: bounds._sw.lat
    }
  }
}

onMounted(async () => {
  map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13, 51.15],
    zoom: 8
  });

  map.on('click', (event: any) => {
    const isClickOnMarker = event.originalEvent.target.classList[0].includes('marker')
    if (!isClickOnMarker) {
      // resetMarkerStyle()
      emit('closeDetails', activeMarker)
    }
  });

  updateBounds()

  map.on('moveend',
    debounce(updateBounds, 400))

  loopActiveEntities((entity: any) => {
    if (hasLatLong(entity)) addEntityToMarkerArray(entity)
  })
  markers.forEach(({libreMarker}) => {
    libreMarker.addTo(map)
  })

})

onUpdated(() => {
  markers.forEach(marker => marker.libreMarker.remove())
  markers.splice(0, markers.length)

  loopActiveEntities((entity: any) => {
    if (hasLatLong(entity)) addEntityToMarkerArray(entity)
  })

  markers.forEach(({libreMarker}) => {
    libreMarker.addTo(map)
  })
})
</script>

<style lang="scss">
.map {
  height: 100%;
  width: 100%;
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
}
</style>
