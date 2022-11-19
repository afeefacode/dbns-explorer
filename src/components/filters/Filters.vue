<template>
  <q-separator/>
  <div class="q-pa-md q-mb-md">
    <div class="row q-gutter-md justify-center ">
      <OrgTypeFilter v-if="activeEntity === 'actors'"/>
      <RegionFilter class="col-12 col-sm-6 col-md-3"/>
      <CategoryFilter class="col-12 col-sm-6 col-md-4"/>
      <EntitySearch class="col-12 col-sm-6 col-md-4"/>
    </div>
  </div>
  <q-separator/>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import OrgTypeFilter from 'components/filters/OrgTypeFilter.vue';
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';

const baseStore = useBaseStore()
const {activeEntity} = storeToRefs(baseStore)
</script>
