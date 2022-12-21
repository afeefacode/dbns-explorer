<template>
  <div id='map' class="map"/>
  <div style="display:none"> entityListLoading: {{ entityListLoading }}</div>
</template>
<script setup lang="ts">
import {onMounted, defineEmits, ref, onUpdated, defineProps, watch} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'

import pngMarker from 'assets/markers/marker.png'
import pngMarkerActive from 'assets/markers/marker-active.png'

import pngMarkerActors from 'assets/markers/marker-actors.png'
import pngMarkerActorsActive from 'assets/markers/marker-actors-active.png'

import pngMarkerCounselings from 'assets/markers/marker-counselings.png'
import pngMarkerCounselingsActive from 'assets/markers/marker-counselings-active.png'

import pngMarkerEducations from 'assets/markers/marker-educations.png'
import pngMarkerEducationsActive from 'assets/markers/marker-educations-active.png'

import pngMarkerEvents from 'assets/markers/marker-events.png'
import pngMarkerEventsActive from 'assets/markers/marker-events-active.png'

import pngMarkerProjects from 'assets/markers/marker-projects.png'
import pngMarkerProjectsActive from 'assets/markers/marker-projects-active.png'

import pngMarkerStores from 'assets/markers/marker-stores.png'
import pngMarkerStoresActive from 'assets/markers/marker-stores-active.png'

import {useBaseStore} from "src/stores/base-store";
import {useEntityStore} from "src/stores/entity-store";
import {getTypeFromEntity, hasLatLong} from 'src/utils'
// import markerActorDOM from 'assets/markers/marker-actor'
// import markerActorSvg from 'assets/markers/marker-actors.svg'

const props = defineProps({
  mapExpanded: {
    type: Boolean,
  }
})

watch(() => props.mapExpanded, () => {
  setTimeout(() => {
    map.resize()
  }, 150)
})

const entityStore = useEntityStore()
const {entityLists, entityListLoading} = storeToRefs(entityStore)

const emit = defineEmits(['openDetails', 'closeDetails'])
const config = useBaseStore().config

const activeMarker = ref(null)
let map: any

const getMarkerPng = (entityType: string) => {
  // console.log('entityType', entityType)
  let marker = {
    inactive: '',
    active: ''
  }

  switch (entityType) {
    case 'actor':
      marker.inactive = pngMarkerActors
      marker.active = pngMarkerActorsActive
      break;
    case 'project':
      marker.inactive = pngMarkerProjects
      marker.active = pngMarkerProjectsActive
      break;
    case 'event':
      marker.inactive = pngMarkerEvents
      marker.active = pngMarkerEventsActive
      break;
    case 'education':
      marker.inactive = pngMarkerEducations
      marker.active = pngMarkerEducationsActive
      break;
    case 'counseling':
      marker.inactive = pngMarkerCounselings
      marker.active = pngMarkerCounselingsActive
      break;
    case 'store':
      marker.inactive = pngMarkerStores
      marker.active = pngMarkerStoresActive
      break;
    default:
      marker.inactive = pngMarker
      marker.active = pngMarkerActive
      break;
  }

  return marker
}

const resetMarkerStyle = (pngMarker: string) => {
  activeMarker.value.style.backgroundImage = `url(${pngMarkerActors})`
  activeMarker.value.style.zIndex = '0'
}


const createMarkerAndAdd = (entity: any) => {
  console.log('adding marker')
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


  // ATTEMPTS TO ADD MULTIPLE MARKERS AS SVG:

  // https://github.com/maplibre/maplibre-gl-js/issues/144
  // https://github.com/mapbox/mapbox-gl-js/issues/5529
  // const img = new Image(40, 60);
  // img.onload = () => map.addImage('myId',  img, {pixelRatio: window.devicePixelRatio});
  // img.onerror = console.error;
  // img.src = markerActorSvg;


  // new maplibregl.Marker({
  //   element: markerActorDOM.firstChild,
  //   color: config.brandColor,
  // })
  //   .setLngLat([entity.latlng[1], entity.latlng[0]])
  //   .addTo(map)

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

onMounted(async () => {
  console.log('mounted MapLibre')

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
  updateMap()
})

onUpdated(() => {
  console.log('updated MapLibre')
  updateMap()
})
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
}
</style>
