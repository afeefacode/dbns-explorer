<template>
  <div id='map'></div>
</template>
<script setup>
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import maplibregl from 'maplibre-gl'

import {useEntityStore} from 'src/stores/entity-store'
import {getTypeFromEntity} from "src/utils";
import {markerSvgs} from 'src/utils/maplibre'


const entityStore = useEntityStore()
const {entityDetail} = storeToRefs(entityStore)

const lat = entityDetail.value.locations[0]?.lat
const long = entityDetail.value.locations[0]?.long

onMounted(async () => {

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [long, lat],
    zoom: 12
  });

  const entityType = getTypeFromEntity(entityDetail.value)

  const markerDiv = document.createElement('div')
  markerDiv.innerHTML = markerSvgs[entityType]
  markerDiv.style.width = '36px'
  markerDiv.style.height = '50px'
  markerDiv.style.top = '-25px'

  new maplibregl.Marker(markerDiv)
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
