<template>
  <div id='map' class="map"></div>
</template>
<script setup>
import maplibregl from 'maplibre-gl'
import {onMounted} from 'vue'
import {Canvg} from 'canvg'

import pngMarkerActor from 'assets/markers/marker-actor.png'

import {useActivitiesStore} from 'src/stores/activities-store'

const entities = useActivitiesStore().activities

onMounted(() => {

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13, 51.15],
    zoom: 7
  });

  const createMarkerAndAdd = (entity) => {
    const marker = document.createElement('div')
    marker.className = 'map__marker'
    marker.style.backgroundImage = `url(${pngMarkerActor})`
    marker.style.backgroundSize = 'contain'
    marker.style.backgroundRepeat = 'no-repeat'
    marker.style.width = '50px'
    marker.style.height = '50px'

    marker.addEventListener('click', function () {
      // window.alert(geoJsonMarker.properties.message)
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
  height: 400px;
}
</style>
