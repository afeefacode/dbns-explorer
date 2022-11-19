<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useBaseStore} from "src/stores/base-store"
import {useCategoryStore} from "src/stores/category-store"
import {inIframe, triggerIframeResize} from 'src/utils'

const baseStore = useBaseStore()
const categoryStore = useCategoryStore()
const router = useRouter()

// get config from url
const configString = (new URL(window.location.href)).searchParams.get('config')
if (configString) {
  baseStore.config = JSON.parse(decodeURI(configString))
}

categoryStore.fetchCategoryList()

// set activeEntity to first config entity
baseStore.activeEntity = baseStore.config.entities[0].type
// navigate to activeEntity
router.push(`/${baseStore.activeEntity}`)

onMounted(async () => {
  if (!inIframe()) {
    document.getElementsByTagName('html')[0].style.overflow = 'scroll'
  }

  window.addEventListener("message", event => {
    switch (event.data.type) {

      case "app_mounted_acknowledged":
        console.log('app_mounted_acknowledged')
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
