<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useConfigStore} from 'stores/config-store'
import {useEntitiesStore} from "stores/entities-store";
import {triggerIframeResize} from "src/utils";

const entitiesStore = useEntitiesStore()
entitiesStore.getActors()

const configStore = useConfigStore()

onMounted(async () => {
  // window.addEventListener('resize', (event) => {
  //   console.error('resized')
  //   triggerIframeResize()
  // });

  await configStore.getConfig()

  document.documentElement.style
    .setProperty('--primary', configStore.config.brandColor);
})


// import {useQuasar} from 'quasar'

// const $q = useQuasar()
//
// const myIcons = {
//   'app:actor': 'img:/src/assets/svg/actor.svg',
//   'app:event': 'img:/src/assets/svg/event.svg',
// }
//
// // Example of adding support for
// // <q-icon name="app:...." />
// // This includes support for all "icon" props
// // of Quasar components
//
// $q.iconMapFn = (iconName) => {
//   // iconName is the content of QIcon "name" prop
//
//   // your custom approach, the following
//   // is just an example:
//   $q.iconMapFn = (iconName) => {
//     const icon = myIcons[iconName]
//     if (icon !== void 0) {
//       return { icon: icon }
//     }
//   }
//
//   // when we don't return anything from our
//   // iconMapFn, the default Quasar icon mapping
//   // takes over
// }
//
// $q.iconMapFn = null


</script>
