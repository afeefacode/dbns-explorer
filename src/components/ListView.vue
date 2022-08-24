<template>
  <div class="list-view q-mt-xl">
    <div class="row">
      <ActivityCard v-for="activity in activities" :activity="activity"/>
    </div>
  </div>
</template>
<script async setup>
import {useActivitiesStore} from 'stores/activities-store'
import ActivityCard from 'components/ListCard.vue'

const activities = useActivitiesStore().activities
</script>
<style lang="scss" scoped>
</style>
