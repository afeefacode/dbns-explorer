<template>
  <div class="q-pa-md q-mb-md">
    <div class="row q-gutter-md q-mb-md justify-center">
      <RegionFilter class="col-12 col-sm-6 col-md-4"/>
      <CategoryFilter class="col-12 col-sm-6 col-md-4"/>
      <EntitySearch class="col-12 col-sm-6 col-md-3"/>
    </div>
    <q-expansion-item
      class="additional-filters"
      v-model="additionalFiltersExpanded"
      :label="`Weitere Filter ${additionalFiltersExpanded ? 'ausblenden' : 'einblenden'}`"
      duration="150"
    >
      <div class="q-mb-lg">
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showActorFilters"
          duration="150"
        >
          <ActorFilters/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showEventFilters"
          duration="150"
        >
          <EventFilters/>
        </q-expansion-item>
        <q-expansion-item
          class="hide-expansion-header"
          v-model="showStoreFilters"
          duration="150"
        >
          <StoreFilters/>
        </q-expansion-item>
        <div v-if="!showAdditionalFilters" class="text-center">
          <i>Keine weiteren Filter vorhanden</i>
        </div>
      </div>
    </q-expansion-item>
    <div class="row q-mt-xs justify-center">
      <!--      <q-btn label="Und los"></q-btn>-->
    </div>
  </div>

  <div class="q-px-lg">
    <q-separator/>
  </div>
</template>

<script setup lang="ts">
import {ref, Transition} from 'vue'
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import ActorFilters from 'components/filters/ActorFilters.vue';
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';
import EventFilters from 'components/filters/EventFilters.vue';
import StoreFilters from 'components/filters/StoreFilters.vue';
import {isActiveEntity} from 'src/utils'

const baseStore = useBaseStore()
const {
  activeEntities,
  showAdditionalFilters,
  showActorFilters,
  showEventFilters,
  showStoreFilters,
  additionalFiltersExpanded
} = storeToRefs(baseStore)

const expanded = ref(true)
</script>
<style lang="scss">
.additional-filters {
  .q-expansion-item__container {
    .q-item__label {
      text-align: center;
      text-decoration: underline;
    }
  }

  .q-item__section--side {
    display: none;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.hide-expansion-header > .q-expansion-item__container > .q-item {
  display: none;
}
</style>
