<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useBaseStore} from "stores/base-store"
import {inIframe, triggerIframeResize} from 'src/utils'

const baseStore = useBaseStore()
const router = useRouter()
const config = baseStore.config

// if (window.location.hash === '#/') {
router.push(`/${config.entities[0].type}`)
// }
baseStore.init(router)


onMounted(async () => {
  if (!inIframe()) {
    document.getElementsByTagName('html')[0].style.overflow = 'scroll'
  }

  window.addEventListener("message", event => {
    switch (event.data.type) {

      case "app_mounted_acknowledged":
        // const paramString = event.data.payload.substring(1)
        // const params = getSearchParameters(paramString);
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
    .setProperty('--brandColor', '#' + baseStore.config.brandColor);

  document.documentElement.style
    .setProperty('--contrastTextColor', '#' + baseStore.config.contrastTextColor);

  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
})

</script>
