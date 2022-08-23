<template>
  <Card v-for="activity in activities"></Card>
</template>
<script setup>
import {useActivitiesStore} from 'stores/activities-store'
const activitiesStore = useActivitiesStore()
const activities = activitiesStore.activities

import Card from 'components/Card.vue'

</script>
