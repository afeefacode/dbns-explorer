<template>
  <div id='map' class="map" ref="mapRef"></div>
</template>
<script setup>
import maplibregl from 'maplibre-gl'
import {onMounted, defineEmits, ref} from 'vue'
import pngMarkerActor from 'assets/markers/marker-actor.png'
import {useActivitiesStore} from 'src/stores/activities-store'

const entities = useActivitiesStore().activities
const emit = defineEmits(['openDetails', 'closeDetails'])

onMounted(async () => {
  const activeMarker = ref(null)

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13, 51.15],
    zoom: 7
  });

  map.on('click', (event) => {
    const isClickOnMarker = event.originalEvent.target.classList[0].includes('marker')
    console.log('activeMarker', activeMarker)
    if (!isClickOnMarker) {
      activeMarker.value.style.width = '60px'
      activeMarker.value.style.height = '60px'
      activeMarker.value.style.zIndex = '0'
      emit('closeDetails')
    }
  });

  const createMarkerAndAdd = (entity) => {
    const marker = document.createElement('div')
    marker.className = 'map__marker'
    marker.style.backgroundImage = `url(${pngMarkerActor})`
    marker.style.backgroundSize = 'contain'
    marker.style.backgroundRepeat = 'no-repeat'
    marker.style.width = '60px'
    marker.style.height = '60px'
    marker.style.cursor = 'pointer'

    marker.addEventListener('click', () => {
      if(activeMarker.value) {
        activeMarker.value.style.width = '60px'
        activeMarker.value.style.height = '60px'
        activeMarker.value.style.zIndex = '0'
      }

      activeMarker.value = marker

      marker.style.width = '80px'
      marker.style.height = '80px'
      marker.value.style.zIndex = '2'

      const offsetX = parseInt(map.getCanvas().style.width) / -4

      map.easeTo({
        center: [
          entity.latlng[1],
          entity.latlng[0]
        ],
        offset: [offsetX, 0]
      })

      emit('openDetails', entity)
    })

    new maplibregl.Marker(marker)
      .setLngLat([entity.latlng[1], entity.latlng[0]])
      .addTo(map)
  }

  entities.forEach(createMarkerAndAdd)
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>
