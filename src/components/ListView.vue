<template>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entityList?.data" :entity="entity" :key="entity.id"/>
    </div>
  </div>
</template>
<script async setup>
import {storeToRefs} from 'pinia'
import {useEntityStore} from 'stores/entity-store'
import EntityCard from 'components/EntityCard.vue'

const entityStore = useEntityStore()
const {entityList} = storeToRefs(entityStore)
</script>

