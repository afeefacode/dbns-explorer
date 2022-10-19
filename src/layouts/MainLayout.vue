<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row entity-icons">
      <EntitySelector
        v-for="entity in config.entities"
        :entity-name="entity.name"
        :active="entity.name === activeEntity"
        @entity-click="activeEntity = entity.name"
      />
    </div>
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useConfigStore} from "src/stores/config-store";
import EntitySelector from 'src/components/filters/EntitySelector.vue'

const config = useConfigStore().config
const activeEntity = ref('actor')
</script>

<style>
.entity-icons {
  justify-content: center;
}

.page-container {
  max-width: 1170px;
  margin: auto;
}
</style>
