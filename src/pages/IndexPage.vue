<template>
  <q-page>
    <div class="q-pl-md">
      <ActorIcon :active="active" @click="active = !active" />

      <h1>{{heading}}</h1>
      <p>{{introduction}}</p>
      <Filters />
      <MapView/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ActorIcon from 'components/filters/entity-icons/ActorIcon.vue'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import {ref} from 'vue'
import {useConfigStore} from 'src/stores/config-store'

const heading = useConfigStore().heading
const introduction = useConfigStore().introduction

const active = ref(false)
</script>
