<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useEntitiesStore} from 'stores/entities-store'
import {useConfigStore} from 'stores/config-store'
import {useQuasar} from 'quasar'

const $q = useQuasar()

const myIcons = {
  'app:actor': 'img:/src/assets/svg/actor.svg',
  'app:event': 'img:/src/assets/svg/event.svg',
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
const entitiesStore = useEntitiesStore()

onMounted(() => {
  configStore.getConfig()
  entitiesStore.getActors()
})

</script>
