<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row entity-icons">
      <EntitySelector
        v-for="entity in config.entities"
        :entity-type="entity.type"
        :active="entity.type+'s' === path"
        @entity-click="onEntityClick(entity.type)"
      />
    </div>
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {onBeforeRouteUpdate, useRouter} from 'vue-router'
import {useConfigStore} from "src/stores/config-store";
import EntitySelector from 'src/components/filters/EntitySelector.vue'

const config = useConfigStore().config
const router = useRouter()
// const path = ref(router.currentRoute.value.fullPath.split('/')[1])
const path = router.currentRoute.value.fullPath.split('/')[1]

onBeforeRouteUpdate(() => {
    
})


const activeEntity = ref(path)


watch(path, () => {
  console.log('path changed')
})


const onEntityClick = (entityType: string) => {

  console.log('path.value', path.value)

  // const path = router.currentRoute.value.fullPath.split('/')[1]
  //
  // console.log('entityType', entityType)
  //
  // activeEntity.value = path
  // // activeEntity.value = entityType
  // // router.push(`/${entityType}s`)
  //
  //
  // console.log('path', path)
  // console.log('activeEntity.value', activeEntity.value)
  // console.log("path === activeEntity.value", path === activeEntity.value)
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
