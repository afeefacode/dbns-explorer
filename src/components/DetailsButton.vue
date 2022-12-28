<template>
  <q-btn
    label="Details"
    @click="openDetailPage"
  />
</template>
<script setup>
import {defineProps} from 'vue'
import {useRouter} from 'vue-router'
import {useBaseStore} from 'src/stores/base-store'
import {getTypeFromEntity} from 'src/utils'

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
  router.push(`/${entityType}s/${props.entity.id}`)
  window.parent.postMessage({
    type: "scroll_to_top_of_iframe",
  }, '*')

  // window.parent.postMessage({
  //   type: "update_url",
  //   payload: {
  //     entityType,
  //     entityId: props.entity.id
  //   }
  // }, '*')
}
</script>
