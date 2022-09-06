<template>
  <div id='map' class="map"></div>
</template>
<script setup>
import maplibregl from 'maplibre-gl'
import {onMounted} from 'vue'

onMounted(() => {
  const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/bright/style.json?key=r6JROvArZPt0irVDImJa',
    center: [13.7065337, 51.029749],
    zoom: 9
  });
})
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 600px;
}
</style>
