<template>
  <div class="map-wrapper">
    <q-img src="../../img/map-placeholder.png" class="map-placeholder" @click="detailsOpened = !detailsOpened"/>
    <DetailsDrawer :entity="entity" v-show="detailsOpened"></DetailsDrawer>
  </div>
  <q-toggle
    v-model="mapAsListFilter"
    checked-icon="filter_alt"
    color="green"
    label="Kartenausschnitt als Listenfilter"
    unchecked-icon="filter_alt"
    class="filter-toggler"
  />
</template>
<script setup>
import {ref, onUpdated} from 'vue'
import {useActivitiesStore} from 'src/stores/activities-store'
import DetailsDrawer from './DetailsDrawer.vue'

const detailsOpened = ref(true)
const mapAsListFilter = ref(true)

onUpdated(() => console.log('detailsOpened', detailsOpened))


const entity = useActivitiesStore().activities[1]

</script>
<style lang="scss" scoped>
.map-wrapper {
  position: relative;
}

.map-placeholder {
  max-width: 1140px;
}

.filter-toggler {
  float: right;
  margin-right: 16px;
}

</style>
