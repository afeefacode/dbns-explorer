<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useActivitiesStore} from 'stores/activities-store'
import {useConfigStore} from 'stores/config-store'
import {useQuasar} from 'quasar'

const $q = useQuasar()

const myIcons = {
  'app:actor': 'img:/src/assets/svg/actors.svg',
  'app:event': 'img:/src/assets/svg/events.svg',
}

// Example of adding support for
// <q-icon name="app:...." />
// This includes support for all "icon" props
// of Quasar components

$q.iconMapFn = (iconName) => {
  // iconName is the content of QIcon "name" prop

  // your custom approach, the following
  // is just an example:
  $q.iconMapFn = (iconName) => {
    const icon = myIcons[iconName]
    if (icon !== void 0) {
      return { icon: icon }
    }
  }

  // when we don't return anything from our
  // iconMapFn, the default Quasar icon mapping
  // takes over
}

$q.iconMapFn = null


const configStore = useConfigStore()
const activitiesStore = useActivitiesStore()

onMounted(() => {
  configStore.getConfig()
  activitiesStore.getActivities()
})

</script>
