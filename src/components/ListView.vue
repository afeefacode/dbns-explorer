<template>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entities" :entity="entity"/>
    </div>
  </div>
</template>
<script async setup>
import {useActorStore} from 'stores/actor-store'
import EntityCard from 'components/EntityCard.vue'



const entities = useActorStore().actors
</script>
<style lang="scss" scoped>
</style>
