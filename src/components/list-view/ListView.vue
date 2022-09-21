<template>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entitys" :entity="entity"/>
    </div>
  </div>
</template>
<script async setup>
import {useEntitiesStore} from 'src/stores/entities-store'
import EntityCard from 'components/list-view/EntityCard.vue'

const entitys = useEntitiesStore().actors
</script>
<style lang="scss" scoped>
</style>
