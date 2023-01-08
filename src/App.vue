<template>
  <router-view/>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {setCssVar} from 'quasar'
import {useBaseStore} from "src/stores/base-store"
import {useFilterStore} from 'stores/filter-store'
import {useCategoryStore} from "src/stores/category-store"
import {useEntityStore} from "src/stores/entity-store"
import {isInIframe, triggerIframeResize, getSearchParameters, hex2rgb} from 'src/utils'

const baseStore = useBaseStore()
const filterStore = useFilterStore()
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
filterStore.activeEntities.push(baseStore.config.entities[0].type)
entityStore.fetchEntityList(baseStore.config.entities[0].type)

onMounted(async () => {

  if (!isInIframe()) {
    document.getElementsByTagName('html')[0].style.overflowY = 'scroll'
  }

  window.addEventListener("message", event => {
    switch (event.data.type) {
      case "app_mounted_acknowledged":
        baseStore.parentLocation = event.data.windowLocation
        const paramString = event.data.windowLocation.search.substring(1)
        const params = getSearchParameters(paramString);
        if (params.entity && params.id) {
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

  const brandRgb = hex2rgb('#' + baseStore.config.brandColor)
  document.documentElement.style
    .setProperty('--brandColor-lighter', `rgba(${brandRgb.r + 10}, ${brandRgb.g + 10}, ${brandRgb.b + 10}, 1)`);

  document.documentElement.style
    .setProperty('--contrastTextColor', '#' + baseStore.config.contrastTextColor);

  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
})
</script>
