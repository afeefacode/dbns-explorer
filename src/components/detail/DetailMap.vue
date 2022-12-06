<template>
  <div id='map'></div>
</template>
<script setup>
import {onMounted} from 'vue'
import maplibregl from 'maplibre-gl'
import pngMarkerActor from 'assets/markers/marker-actors.png'
import {useEntityStore} from 'src/stores/entity-store'

const entityStore = useEntityStore()

const lat = entityStore.entityDetail.locations[0]?.lat
const long = entityStore.entityDetail.locations[0]?.long

onMounted(async () => {

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [long, lat],
    zoom: 12
  });

  const marker = document.createElement('div')
  marker.className = 'map__marker'
  marker.style.backgroundImage = `url(${pngMarkerActor})`
  marker.style.backgroundSize = 'contain'
  marker.style.backgroundRepeat = 'no-repeat'
  marker.style.width = '36px'
  marker.style.height = '50px'
  marker.style.cursor = 'pointer'

  new maplibregl.Marker(marker)
    .setLngLat([long, lat])
    .addTo(map)
})
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 250px;
}
</style>
