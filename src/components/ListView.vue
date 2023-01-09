<template>
  <h2 class="text-h4 text-center q-mb-sm">
    {{ getGermanEntityName(entityType, 'category') }}
  </h2>
  <div v-if="entityType === 'events' && showFilters.events" class="text-center">
    <q-btn
      label="Zeitraum auswählen"
      @click="eventFiltersExpanded = !eventFiltersExpanded"
      color="primary"
      flat
      class="q-mb-sm"
    />

    <q-expansion-item
      class="hide-expansion-header"
      v-model="baseStore.eventFiltersExpanded"
      :duration="150"
    >
      <EventFilters class="q-mb-md" :inListView="true"/>
    </q-expansion-item>
  </div>
  <div v-if="entityType === 'actors' && showFilters.actors" class="text-center">
      <ActorFilters class="q-mb-md q-px-md" :inListView="true"/>
  </div>
  <div v-if="entityType === 'stores' && showFilters.stores" class="text-center">

      <StoreFilters class="q-mb-md q-px-md" :inListView="true"/>
  </div>
  <div class="list-view">
    <div v-if="entityLists[entityType]?.length">
      <div class="row">
        <EntityCard v-for="entity in entityLists[entityType].slice(0,limit)" :entity="entity" :key="entity.id"/>
      </div>
      <div class="row q-mt-xl justify-center" @click="increaseLimit">
      <q-btn
        :label="`mehr ${ getGermanEntityName(entityType, 'plural') } anzeigen`"
        @click="increaseLimit"
        color="primary"
        flat
        icon="keyboard_arrow_down"
      />
      </div>
    </div>
    <div v-else class="text-center no-data-label">
      <i>Keine Einträge zu diesen Filtern gefunden.</i>
    </div>
  </div>
  <q-separator class="q-my-xl"></q-separator>
</template>
<script async setup lang="ts">
// node_modules
import {defineProps, ref} from 'vue'
import {storeToRefs} from 'pinia'

// stores & utils
import {useBaseStore} from 'stores/base-store'
import {useFilterStore} from 'stores/filter-store'
import {useEntityStore} from 'stores/entity-store'
import {getGermanEntityName, showFilters as showFiltersFn} from 'src/utils'

// components
import EntityCard from 'components/EntityCard.vue'
import ActorFilters from 'components/list/filters/ActorFilters.vue'
import EventFilters from 'components/list/filters/EventFilters.vue'
import StoreFilters from 'components/list/filters/StoreFilters.vue'

const props = defineProps({
  entityType: {
    type: String,
    default: null,
  }
})

const baseStore = useBaseStore()
const filterStore = useFilterStore()
const entityStore = useEntityStore()

const config = baseStore.config
const {eventFiltersExpanded, actorFiltersExpanded, storeFiltersExpanded} = storeToRefs(baseStore)
const {activeFilters} = storeToRefs(filterStore)
const {entityLists} = storeToRefs(entityStore)

if (!entityLists[props.entityType]) {
  entityStore.fetchEntityList(props.entityType)
}

const limit = ref(4)
const maxLimitReached = ref(false)

const increaseLimit = () => {
  limit.value = limit.value + 6
  if (limit > 50) {
    maxLimitReached.value = true
  }
}

const showFilters = {
  actors: showFiltersFn('actors', config),
  events: showFiltersFn('events', config),
  stores: showFiltersFn('stores', config),
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

