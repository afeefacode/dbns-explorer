<template>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height:400px">

    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom"
             :projection="projection"/>

    <ol-tile-layer>
      <ol-source-osm/>
    </ol-tile-layer>

  </ol-map>
</template>
<script setup>
import {ref} from 'vue'

const center = ref([13.70674761439971, 51.029751594296265])
const projection = ref('EPSG:4326') //3857 4326 7789
const zoom = ref(12)
const rotation = ref(0)
</script>
