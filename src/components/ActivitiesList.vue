<template>
  <div class="row activities-list">
    <ActivityCard v-for="activity in activities" :activity="activity"/>
  </div>
</template>
<script async setup>
import {useActivitiesStore} from 'stores/activities-store'
import ActivityCard from 'components/ActivityCard.vue'

const activities = useActivitiesStore().activities
</script>
<style lang="scss" scoped>
.activities-list {
  background: #F3F4F2;
}
</style>
