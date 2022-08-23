<template>
  <ActivityCard v-for="activity in activities" :activity="activity" />
</template>
<script async setup>
import {useActivitiesStore} from 'stores/activities-store'
import ActivityCard from 'components/ActivityCard.vue'

const activitiesStore = useActivitiesStore()
const activities = useActivitiesStore().activities
console.log('activities', activities)

</script>
