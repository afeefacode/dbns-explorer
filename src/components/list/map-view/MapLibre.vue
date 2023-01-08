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
import {debounce, getTypeFromEntity, hasLatLong, isActiveEntity} from 'src/utils'
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
  markerDiv.style.width = '36px'
  markerDiv.style.height = '50px'
  markerDiv.style.top = '-25px'
  markerDiv.style.cursor = 'pointer'

  if (entity.id == activeMarker.value.entity?.id) {
    markerDiv.classList.add('marker--active')
    activeMarker.value.entity = entity
    activeMarker.value.markerDiv = markerDiv
  }


  markerDiv.addEventListener('click', () => {
    activeMarker.value.markerDiv?.classList.remove('marker--active')

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

  const libreMarker = new maplibregl.Marker(markerDiv)
    .setLngLat([entity.locations[0].long, entity.locations[0].lat])

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
    const isClickOnMarker = event.originalEvent.target.tagName !== 'CANVAS'
    if (!isClickOnMarker) {

      activeMarker.value.markerDiv?.classList.remove('marker--active')
      activeMarker.value.entity = null
      activeMarker.value.markerDiv = null
    }
  });

  updateBounds()

  map.on('moveend',
    debounce(updateBounds, 0)
  )

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
#map {
  height: 100%;
  width: 100%;
}

.marker--active {
  z-index: 5;

  path.background {
    fill: var(--brandColor-darker);
  }
}
</style>
