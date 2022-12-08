<template>
  <h2 class="text-h4 text-center">{{ getGermanEntityName(entityType, 'category') }}</h2>
  <div class="list-view">
    <div v-if="entityLists[entityType]?.length">
      <div class="row">
        <EntityCard v-for="entity in entityLists[entityType].slice(0,limit)" :entity="entity" :key="entity.id"/>
      </div>
      <div class="row q-mt-xl justify-center text-button" @click="increaseLimit">Mehr
        {{ getGermanEntityName(entityType, 'plural') }} anzeigen
      </div>
    </div>

    <div v-else class="text-center"><i>Keine Einträge zu diesen Filtern gefunden.</i></div>
  </div>
  <q-separator class="q-my-xl"></q-separator>
</template>
<script async setup>
import {defineProps, ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'stores/base-store'
import {useEntityStore} from 'stores/entity-store'
import {getGermanEntityName} from 'src/utils'
import EntityCard from 'components/EntityCard.vue'

const props = defineProps({
  entityType: {
    type: String,
    default: null,
  }
})

const baseStore = useBaseStore()
const {activeEntities} = baseStore

const entityStore = useEntityStore()
const {entityLists} = storeToRefs(entityStore)

if (!entityLists[props.entityType]) {
  entityStore.fetchEntityList(props.entityType)
}

const limit = ref(activeEntities.length > 1 ? 4 : 8)
const maxLimitReached = ref(false)

const increaseLimit = () => {
  limit.value = limit.value + 6
  if (limit > 50) {
    maxLimitReached.value = true
  }
}
</script>

