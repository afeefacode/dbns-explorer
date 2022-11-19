<template>
  <div id='map'></div>
</template>
<script setup>
import {onMounted, defineEmits, ref} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'
import pngMarkerActor from 'assets/markers/marker-actors.png'
import {useEntityStore} from 'src/stores/entity-store'

const entityStore = useEntityStore()
const {entityDetail} = storeToRefs(entityStore)

console.log('entityDetail', entityDetail.value)

onMounted(async () => {

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [actor.latlng[1], actor.latlng[0]],
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
    .setLngLat([actor.latlng[1], actor.latlng[0]])
    .addTo(map)
})
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  height: 200px;
}
</style>
