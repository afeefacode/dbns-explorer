<template>
  <h2 class="text-h4 text-center">{{getGermanEntityName(entityType, 'plural')}}</h2>
  <div class="list-view">
    <div class="row" v-if="entityLists[entityType]">
      <EntityCard v-for="entity in entityLists[entityType]" :entity="entity" :key="entity.id"/>
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
const {entityLists} = storeToRefs(entityStore)

if(!entityLists[props.entityType]) {
  console.log('props.entityType', props.entityType)
  entityStore.fetchEntityList(props.entityType)
}
</script>

