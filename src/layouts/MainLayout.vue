<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row entity-icons">
      <EntitySelector
        v-for="entity in config.entities"
        :entity-type="entity.type"
        :active="entity.type === activeEntity"
        @entity-click="onEntityClick(entity.type)"
      />
    </div>
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from 'vue-router'
import {useConfigStore} from "src/stores/config-store";
import EntitySelector from 'src/components/filters/EntitySelector.vue'

const config = useConfigStore().config
const router = useRouter()
const activeEntity = ref('actor')

const onEntityClick = (entityType: string) => {
  activeEntity.value = entityType
  router.push(`/${entityType}s`)
}
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
