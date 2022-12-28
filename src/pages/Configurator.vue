<template>
  <div class="page-container q-ma-xl">
    <h5>Host</h5>
    <div class="q-gutter-sm">
      <q-radio v-model="host" val="http://localhost:9000" label="Development (localhost)"/>
      <q-radio v-model="host" val="https://dbns-explorer.netlify.app" label="Production (netlify.app)"/>
    </div>
    <div v-for="config in configs">
      <h3>{{ config.name }}</h3>
      <div class="snippet" @click="copyToClipboard(getSnippet(config, host))">{{ getSnippet(config, host) }}</div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {config as full_widget} from 'src/assets/configs/lvns/full_widget'
import {config as upcoming_lvns_events} from 'src/assets/configs/lvns/upcoming_lvns_events'
import {config as all_lvns_events} from 'src/assets/configs/lvns/all_lvns_events'
import {config as all_events} from 'src/assets/configs/all_events'
import {configJsonToUrlParam} from 'src/utils'

const $q = useQuasar()

const configs = [
  full_widget,
  upcoming_lvns_events,
  all_lvns_events,
  all_events
]

const host = ref('http://localhost:9000')

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  // navigator.clipboard.writeText(text.replace(/\s/g,''))

  $q.notify({
    message: 'In Zwischenablage kopiert',
    color: 'primary'
  })
}

const getSnippet = (config, host) => {
  return `<style>
  #iframe-dbns-explorer {
    width: 100%;
    max-width: 100%;
    min-height: 500px;
    border: 0;
  }

  .wp-block-spacer, .wp-block-separator {
    display: none;
  }
</style>
<iframe id="iframe-dbns-explorer" title="Aktiv in Sachsen" src="${host}/?${configJsonToUrlParam(config)}"></iframe>
<script src="${host}/iframeScript.js"><\/script>`
}
</script>
<style lang="scss" scoped>
.snippet {
  cursor: pointer;
}
.snippet:active {
  color: #999;
}
</style>
