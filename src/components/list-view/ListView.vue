<template>
  <div class="list-view q-mt-xl">
    <div class="row">
      <ActivityCard v-for="activity in activities" :activity="activity"/>
    </div>
  </div>
</template>
<script async setup>
import {useEntitiesStore} from 'src/stores/entities-store'
import ActivityCard from 'src/components/list-view/ListCard.vue'

const activities = useEntitiesStore().actors
</script>
<style lang="scss" scoped>
</style>
