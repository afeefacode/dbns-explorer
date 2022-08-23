<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useActivitiesStore} from 'stores/activities-store'

const activitiesStore = useActivitiesStore()
onMounted(() => {
  activitiesStore.getActivities()
})

</script>
