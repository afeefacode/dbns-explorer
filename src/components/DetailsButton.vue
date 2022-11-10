<template>
  <q-btn :style="`background: #${config.brandColor}; color: ${config.brandTextColor}`"
         :icon="`img:/src/assets/svg/${entity.type}.svg`"
         :label="`${getGermanEntityName(entity.type, 'singular')} anzeigen`"
         @click="openDetailPage"
  />
</template>
<script setup>
import {defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {useConfigStore} from 'src/stores/config-store'
import {getGermanEntityName} from 'src/utils'

const props = defineProps({
  entity: {
    type: Object,
    default: null
  }
})
const config = useConfigStore().config
const router = useRouter()

const openDetailPage = () => {
  router.push(`/${props.entity.type.toLowerCase()}s/${props.entity.id}`)
}

</script>
