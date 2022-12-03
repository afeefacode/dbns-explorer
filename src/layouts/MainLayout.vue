<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useBaseStore} from "src/stores/base-store";

import EntitySelector from 'src/components/list/filters/EntitySelector.vue'

const router = useRouter()
const baseStore = useBaseStore()
const config = useBaseStore().config

// baseStore.activeEntity = router.currentRoute.value.fullPath.split('/')[1]
// const {activeEntity} = storeToRefs(baseStore)

// todo: single source of truth - this should not be a ref but only handled in the base store
// const activeEntity = ref(router.currentRoute.value.fullPath.split('/')[1])

const showEntitySelector = Object.keys(config.entities).length > 1

// const onEntityClick = (entityType: string) => {
//   activeEntity.value = entityType
//   router.push(`/${entityType}`)
//   baseStore.activeEntity = entityType
// }

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
