<template>
  <!--    <canvas></canvas>-->
  <div id='map' class="map"></div>
</template>
<script setup>
import maplibregl from 'maplibre-gl'
import {onMounted, defineEmits} from 'vue'
import pngMarkerActor from 'assets/markers/marker-actor.png'
import {useActivitiesStore} from 'src/stores/activities-store'
// import {Canvg} from 'canvg'
// import actorsSvg from 'assets/svg/actors.svg'

const entities = useActivitiesStore().activities

const emit = defineEmits(['openDetails', 'closeDetails'])

onMounted(async () => {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13, 51.15],
    zoom: 7
  });

  map.on('click', function (event) {
    const isClickOnMarker = event.originalEvent.target.classList[0].includes('marker')
    if(!isClickOnMarker) {
      emit('closeDetails')
    }
  });

  const createMarkerAndAdd = (entity) => {
    const marker = document.createElement('div')
    marker.className = 'map__marker'
    marker.style.backgroundImage = `url(${pngMarkerActor})`
    marker.style.backgroundSize = 'contain'
    marker.style.backgroundRepeat = 'no-repeat'
    marker.style.width = '50px'
    marker.style.height = '50px'
    marker.style.cursor = 'pointer'


    marker.addEventListener('click', (event) => {
        map.easeTo({center: [
            entity.latlng[1],
            entity.latlng[0]
          ]})
        emit('openDetails', entity)
    })

    new maplibregl.Marker(marker)
      .setLngLat([entity.latlng[1], entity.latlng[0]])
      .addTo(map)
  }

  entities.forEach(createMarkerAndAdd)

  // const createPngFromSvg = async () => {
  //   const canvas = document.querySelector('canvas');
  //   const ctx = canvas.getContext('2d');
  //   let canvg = await Canvg.from(ctx, actorsSvg);
  //   canvg.start();
  //   const png = canvas.toDataURL('image/png')
  //   canvg.stop();
  //   console.log('png', png)
  // }
  // createPngFromSvg()
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>
