<template>
  <div id='map' class="map"></div>
</template>
<script setup>
import {onMounted, defineEmits, ref, onUpdated} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'
import pngMarker from 'assets/markers/marker.png'
import pngMarkerActive from 'assets/markers/marker-active.png'
import {useBaseStore} from "src/stores/base-store";
import {useEntityStore} from "src/stores/entity-store";
import {hasLatLong} from 'src/utils'
// import markerActorDOM from 'assets/markers/marker-actor'
// import markerActorSvg from 'assets/markers/marker-actors.svg'

const entityStore = useEntityStore()
const {entityLists, entityListLoading} = storeToRefs(entityStore)

const emit = defineEmits(['openDetails', 'closeDetails'])
const config = useBaseStore().config

const activeMarker = ref(null)
let map

const resetMarkerStyle = () => {
  // activeMarker.value.style.width = '40px'
  // activeMarker.value.style.height = '50px'
  activeMarker.value.style.backgroundImage = `url(${pngMarker})`
  activeMarker.value.style.zIndex = '0'
}

const createMarkerAndAdd = (entity) => {
  const marker = document.createElement('div')
  marker.className = 'map__marker'
  marker.style.backgroundImage = `url(${pngMarker})`
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

    // marker.style.width = '50px'
    // marker.style.height = '60px'
    marker.style.backgroundImage = `url(${pngMarkerActive})`
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
  console.log('updated')
  updateMap()
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 550px;
}
</style>