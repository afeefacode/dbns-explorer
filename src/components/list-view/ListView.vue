<template>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entities" :entity="entity"/>
    </div>
  </div>
</template>
<script async setup>
import {useEntitiesStore} from 'src/stores/entities-store'
import EntityCard from 'components/list-view/EntityCard.vue'

const entities = useEntitiesStore().actors
</script>
<style lang="scss" scoped>
</style>
