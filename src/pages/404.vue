<template>
  <q-page class="q-mb-xl justify-center">
    <h1 class="text-h3 text-center">Leider nichts gefunden</h1>
    <div class="text-center"> Unter dem von dir aufgerufenen Link können wir leider nichts finden
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useConfigStore} from 'stores/config-store'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/ListView.vue'
import MapListToggle from 'components/MapListToggle.vue'

const config = useConfigStore().config
const activeView = ref('map')
const entitySelected = () => {
}
const viewToggled = (newView: string) => {
  activeView.value = newView
}

const triggerIframeResize = () => {
  const appHeight = document.getElementById('q-app').scrollHeight
  const resizeMessage = {
    type: "app_resized",
    payload: appHeight
  }
  window.parent.postMessage(resizeMessage, '*')
}

onMounted(() => {
  let qApp = document.getElementById('q-app')
  new ResizeObserver(triggerIframeResize).observe(qApp)
})

</script>

<style lang="scss" scoped>

.introduction {
  margin-bottom: 2em;
}
</style>
