<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row entity-icons">
      <EntitySelector
        v-if="showEntitySelector"
        v-for="entity in config.entities"
        :entity-type="entity.type"
        :active="entity.type + 's' === activeEntity"
        @entity-click="onEntityClick(entity.type+'s')"
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
import {useBaseStore} from "stores/base-store";

const config = useConfigStore().config
const router = useRouter()
useBaseStore().activeEntity = router.currentRoute.value.fullPath.split('/')[1]
// todo: single source of truth - this should not be a ref but only handled in the base store
const activeEntity = ref(router.currentRoute.value.fullPath.split('/')[1])

const showEntitySelector = Object.keys(config.entities).length > 1

const onEntityClick = (entityType: string) => {
  activeEntity.value = entityType
  router.push(`/${entityType}`)
  useBaseStore().activeEntity = entityType
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
