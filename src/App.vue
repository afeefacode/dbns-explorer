<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {setCssVar} from 'quasar'
import {useBaseStore} from "src/stores/base-store"
import {useCategoryStore} from "src/stores/category-store"
import {useEntityStore} from "src/stores/entity-store"
import {inIframe, triggerIframeResize, getSearchParameters} from 'src/utils'

const baseStore = useBaseStore()
const categoryStore = useCategoryStore()
const entityStore = useEntityStore()
const router = useRouter()

// get config from url
const configString = (new URL(window.location.href)).searchParams.get('config')
if (configString) {
  baseStore.config = JSON.parse(decodeURI(configString))
}

categoryStore.fetchCategoryList()

//@ts-ignore
baseStore.activeEntities.push(baseStore.config.entities[0].type)
entityStore.fetchEntityList(baseStore.config.entities[0].type)

onMounted(async () => {

  if (!inIframe()) {
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
  }

  window.addEventListener("message", event => {
    switch (event.data.type) {

      case "app_mounted_acknowledged":
        baseStore.windowLocation = event.data.windowLocation
        const paramString = event.data.windowLocation.search.substring(1)
        console.log('paramString', paramString)
        const params = getSearchParameters(paramString);
        if (params.entity && params.id) {
          console.log('routing')
          router.push(`/${params.entity}/${params.id}`)
        }
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

  setCssVar('primary', "#" + baseStore.config.brandColor)

  document.documentElement.style
    .setProperty('--brandColor', '#' + baseStore.config.brandColor);

  document.documentElement.style
    .setProperty('--contrastTextColor', '#' + baseStore.config.contrastTextColor);

  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
  console.log('finished mounting')
})
</script>
