<template>
  <q-btn :style="`background: ${config.brandColor}; color: ${config.brandTextColor}`"
         :icon="`img:/src/assets/svg/${entity.type}.svg`"
         :label="`${entity.type} anzeigen`"
         @click="openDetailPage"
  />
</template>
<script setup>
import {defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {useConfigStore} from 'src/stores/config-store'

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
