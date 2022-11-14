<template>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entityStore.entityList.data" :entity="entity"/>
    </div>
  </div>
</template>
<script async setup>
import {useEntityStore} from 'stores/entity-store'
import EntityCard from 'components/EntityCard.vue'
const entityStore = useEntityStore()
</script>
