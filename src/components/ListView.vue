<template>
  <h2 class="text-h4 text-center">{{ getGermanEntityName(entityType, 'category') }}</h2>
  <div v-if="entityType === 'events'">
    <EventFilters class="q-mb-md" :inListView="true"/>
    <ApplyFiltersButton :filterCategory="'events'"/>
  </div>
  <div v-if="entityType === 'actors'">
    <ActorFilters class="q-mb-md q-px-md" :inListView="true"/>
    <ApplyFiltersButton :filterCategory="'actors'" class="q-mb-lg"/>
  </div>
  <div v-if="entityType === 'stores'" class="q-mb-lg">
    <StoreFilters class="q-mb-md q-px-md" :inListView="true"/>
    <ApplyFiltersButton :filterCategory="'stores'"/>
  </div>
  <div class="list-view">
    <div v-if="entityLists[entityType]?.length">
      <div class="row">
        <EntityCard v-for="entity in entityLists[entityType].slice(0,limit)" :entity="entity" :key="entity.id"/>
      </div>
      <div class="row q-mt-xl justify-center text-button" @click="increaseLimit">Mehr
        {{ getGermanEntityName(entityType, 'plural') }} anzeigen
      </div>
    </div>
    <div v-else class="text-center no-data-label">
      <i>Keine Einträge zu diesen Filtern gefunden.</i>
    </div>
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
import ActorFilters from 'components/list/filters/ActorFilters.vue'
import EventFilters from 'components/list/filters/EventFilters.vue'
import StoreFilters from 'components/list/filters/StoreFilters.vue'
import ApplyFiltersButton from 'components/list/ApplyFiltersButton.vue'

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
<style lang="scss" scoped>
.no-data-label {
  display: flex;
  justify-content: center;


  i {
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
    padding: .5em 2em;
    background: #fafafa;
  }
}
</style>

