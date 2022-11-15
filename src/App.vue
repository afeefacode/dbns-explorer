<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useQuasar} from 'quasar'
import {useBaseStore} from "stores/base-store"
import {getSearchParameters, triggerIframeResize} from 'src/utils'

const baseStore = useBaseStore()
const router = useRouter()
const config = baseStore.config

// if (window.location.hash === '#/') {
router.push(`/${config.entities[0].type}`)
// }
baseStore.init(router)

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
    .setProperty('--primary', '#' + baseStore.config.brandColor);

  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
})


const $q = useQuasar()
const myIcons = {
  'app:actors': 'img:/src/assets/svg/actors.svg',
  'app:counselings': 'img:/src/assets/svg/counselings.svg',
  'app:educations': 'img:/src/assets/svg/educations.svg',
  'app:events': 'img:/src/assets/svg/events.svg',
  'app:projects': 'img:/src/assets/svg/projects.svg',
  'app:stores': 'img:/src/assets/svg/stores.svg',
}
$q.iconMapFn = (iconName) => {
  $q.iconMapFn = (iconName) => {
    //@ts-ignore
    const icon = myIcons[iconName]
    if (icon !== void 0) {
      return {icon: icon}
    }
  }
}
// $q.iconMapFn = null


</script>
