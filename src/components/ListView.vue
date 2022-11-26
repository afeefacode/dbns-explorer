<template>
  <h2 class="text-h4 text-center">{{getGermanEntityName(entityType, 'plural')}}</h2>
  <div class="list-view">
    <div class="row">
      <EntityCard v-for="entity in entityList?.data" :entity="entity" :key="entity.id"/>
    </div>
  </div>
  <q-separator class="q-my-xl"></q-separator>
</template>
<script async setup>
import {defineProps} from 'vue'
import {storeToRefs} from 'pinia'
import {useEntityStore} from 'stores/entity-store'
import EntityCard from 'components/EntityCard.vue'
import {getGermanEntityName} from 'src/utils'

const props = defineProps({
  entityType: {
    type: String,
    default: null,
  }
})

const entityStore = useEntityStore()
const {entityList} = storeToRefs(entityStore)
</script>

