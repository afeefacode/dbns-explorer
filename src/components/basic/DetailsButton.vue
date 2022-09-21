<template>
  <q-btn :style="`background: ${config.brandColor}; color: ${config.brandTextColor}`"
         :icon="`img:/src/assets/svg/${entity.type}.svg`"
         :label="`${entity.type} anzeigen`"/>
</template>
<script setup>
import {defineProps} from 'vue'
import {useConfigStore} from 'src/stores/config-store'

const props = defineProps({
  entity: {
    type: Object,
    default: null
  }
})

const config = useConfigStore().config
</script>
