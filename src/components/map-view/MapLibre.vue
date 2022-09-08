<template>
  <div id='map' class="map"></div>
</template>
<script setup>
import maplibregl from 'maplibre-gl'
import {onMounted} from 'vue'

import pngMarkerActor from 'assets/markers/marker-actor.png'



onMounted(() => {
  const geoJson = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'message': 'Foo',
          'iconSize': [60, 60]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [13.7065337, 51.029749]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Bar',
          'iconSize': [50, 50]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [13.6065337, 51.029749]
        }
      },
      {
        'type': 'Feature',
        'properties': {
          'message': 'Baz',
          'iconSize': [40, 40]
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [13.7065337, 51.129749]
        }
      }
    ]
  }

  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13.7065337, 51.029749],
    zoom: 9
  });

  const createMarkerAndAdd = (geoJsonMarker) => {
    const marker = document.createElement('div')
    marker.className = 'map__marker'
    marker.style.backgroundImage = `url(${pngMarkerActor})`
    marker.style.backgroundSize = 'contain'
    marker.style.backgroundRepeat = 'no-repeat'
    marker.style.width = '50px'
    marker.style.height = '50px'

    marker.addEventListener('click', function () {
      window.alert(geoJsonMarker.properties.message)
    })

    new maplibregl.Marker(marker)
      .setLngLat(geoJsonMarker.geometry.coordinates)
      .addTo(map)
  }

  geoJson.features.forEach(createMarkerAndAdd)


})


</script>

<style lang="scss" scoped>
.map {
  width: 600px;
  height: 600px;
}
</style>
