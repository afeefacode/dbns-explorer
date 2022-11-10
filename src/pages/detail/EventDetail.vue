<template>
  <q-page class="q-mb-xl">
    <h1>Detail</h1>
    <h1 class="heading">{{ config.heading }}</h1>
    <p class="introduction">{{ config.introduction }}</p>
    <!--    <ListView />-->
  </q-page>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {useConfigStore} from 'stores/config-store'
import {useActorStore} from 'stores/actor-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
// import ListView from 'components/ListView.vue'



const config = useConfigStore().config

const route = useRoute()
const actorId = route.params.id

const actorStore = useActorStore()
actorStore.fetchActorDetails(actorId)


</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
