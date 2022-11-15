<template>
  <q-btn :style="`background: #${config.brandColor}; color: #${config.contrastTextColor}`"
         :icon="`img:/src/assets/svg/${entityType}s.svg`"
         :label="`${getGermanEntityName(entityType, 'singular')} anzeigen`"
         @click="openDetailPage"
  />
</template>
<script setup>
import {defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {useBaseStore} from 'src/stores/base-store'
import {getGermanEntityName, getTypeFromEntity} from 'src/utils'

const props = defineProps({
  entity: {
    type: Object,
    default: null
  }
})
const config = useBaseStore().config
const router = useRouter()
const entityType = getTypeFromEntity(props.entity)

const openDetailPage = () => {
  router.push(`/${props.entity.type.toLowerCase()}s/${props.entity.id}`)
}
</script>
