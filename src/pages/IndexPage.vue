<template>
  <q-page>
    <div>
      <h1 class="heading">{{ config.heading }}</h1>
      <p class="introduction">{{ config.introduction }}</p>
      <Filters/>
      <MapView/>
      <q-btn :style="`background: ${config.brandColor}; color: ${config.brandTextColor}`"
             icon="img:/src/assets/svg/actors.svg"
             label="Akteur anzeigen"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import {useConfigStore} from 'src/stores/config-store'

const config = useConfigStore().config
</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
