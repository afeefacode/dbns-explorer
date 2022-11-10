<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useConfigStore} from 'stores/config-store'
import {useActorStore} from "stores/actor-store";
import {getSearchParameters, triggerIframeResize} from 'src/utils'

const configStore = useConfigStore()
configStore.getConfigFromUrl()
const config = configStore.config
useRouter().push(`/${config.entities[0].type}s`)

const actorStore = useActorStore()
actorStore.fetchActorList()

onMounted(async () => {
  window.addEventListener("message", event => {
    switch (event.data.type) {

      case "app_mounted_acknowledged":
        const paramString = event.data.payload.substring(1)
        const params = getSearchParameters(paramString);
        break;

      default:
        break;
    }
  })

  const mountedMessage = {
    type: "app_mounted",
    payload: null
  }
  window.parent.postMessage(mountedMessage, '*')

  document.documentElement.style
    .setProperty('--primary', '#' + configStore.config.brandColor);

  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
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
