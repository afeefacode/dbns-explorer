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
}
</script>
