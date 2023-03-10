<template>
  <div id='map'/>
  <div style="display:none"> entityListLoading: {{ entityListLoading }}</div>
</template>
<script setup lang="ts">
import {onMounted, ref, onUpdated} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'

import {useBaseStore} from "src/stores/base-store";
import {useFilterStore} from "src/stores/filter-store";
import {useEntityStore} from "src/stores/entity-store";
import {debounce, getTypeFromEntity, hasLatLong, isActiveEntity, shortenStringTo} from 'src/utils'
import {markerSvgs} from 'src/utils/maplibre'

const baseStore = useBaseStore()
const filterStore = useFilterStore()
const entityStore = useEntityStore()

const config = baseStore.config
const {activeMarker} = storeToRefs(baseStore)
const {entityLists, entityListLoading} = storeToRefs(entityStore)
const {activeEntities} = storeToRefs(filterStore)

let map: any
const markers: any[] = []
const mapMoveByMarkerClick = ref(false)

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

  const markerDiv = document.createElement('div')
  markerDiv.innerHTML = markerSvgs[entityType]
  markerDiv.innerHTML += `<div class="marker-title">${shortenStringTo(30, entity.title)}</div>`
  markerDiv.style.top = '-25px'
  markerDiv.style.cursor = 'pointer'

  if (entity.id == activeMarker.value.entity?.id) {
    markerDiv.classList.add('marker--active')
    activeMarker.value.entity = entity
    activeMarker.value.markerDiv = markerDiv
  }

  markerDiv.addEventListener('click', () => {
    activeMarker.value.markerDiv?.classList.remove('marker--active')

    markerDiv.style.zIndex = markerDiv.style.zIndex + 1

    mapMoveByMarkerClick.value = true

    markerDiv.classList.add('marker--active')
    activeMarker.value.entity = entity
    activeMarker.value.markerDiv = markerDiv

    const offsetX = parseInt(map.getCanvas().style.width) / -4

    map.easeTo({
      center: [
        entity.locations[0].long,
        entity.locations[0].lat
      ],
      offset: [offsetX, 0]
    })
  })

  let locationForMap = {lat: null, long: null}

  // TODO: this only finds and corrects a dual collision, not a multiple collision
  markers.find(marker => {
    if (marker.entity.locations[0].lat === entity.locations[0].lat
      && marker.entity.locations[0].long === entity.locations[0].long) {
      const factor = .0000005
      locationForMap = {
        lat: entity.locations[0].lat * (1 + factor),
        long: entity.locations[0].long,
      }
    } else {
      locationForMap = {
        lat: entity.locations[0].lat,
        long: entity.locations[0].long,
      }
    }
  })

  const libreMarker = new maplibregl.Marker(markerDiv)
    .setLngLat([locationForMap.long, locationForMap.lat])

  const mapMarker = {
    entity,
    markerDiv,
    libreMarker,
  }

  markers.push(mapMarker)
}

const updateBounds = () => {
  if (mapMoveByMarkerClick.value) {
    mapMoveByMarkerClick.value = false
    return
  }

  if (baseStore.activeView === 'list') return

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
    center: baseStore.mapCenter || [13, 51.15],
    zoom: baseStore.mapZoom || 8
  });

  map.on('click', (event: any) => {
    const isClickOnMarker = event.originalEvent.target.tagName !== 'CANVAS'
    if (!isClickOnMarker) {
      activeMarker.value.markerDiv?.classList.remove('marker--active')
      activeMarker.value.entity = null
      activeMarker.value.markerDiv = null
    }
  });

  updateBounds()

  map.on('moveend',
    debounce(updateBounds, 100)
  )

  map.on('moveend', () => {
    baseStore.mapZoom = map.getZoom()
    baseStore.mapCenter = map.getCenter()
  })

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

  loopActiveEntities((entity: any, index: number) => {
    if (index > 50 / activeEntities.value.length) return;
    if (hasLatLong(entity)) addEntityToMarkerArray(entity)
  })

  markers.forEach(({libreMarker}) => {
    libreMarker.addTo(map)
  })
})
</script>

<style lang="scss">
#map {
  height: 100%;
  width: 100%;

  canvas {
    cursor: default;

    &:active {
      cursor: grab;
    }
  }
}

.marker--active {
  z-index: 5;

  path.background {
    fill: var(--brandColor-darker);
  }
}

.marker-title {
  position: absolute;
  top: 10px;
  left: 35px;
  width: inherit;
  padding: 2px 8px;

  color: var(--brandColor-darker);
  white-space: nowrap;
  font-size: 1.6em;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, .8),
  0 0 4px rgba(255, 255, 255, .8),
  0 0 8px rgba(255, 255, 255, .8);
}
</style>
