<template>
  <!--  <q-expansion-item-->
  <!--    class="test"-->
  <!--    v-model="expanded"-->
  <!--    :label="`Filter & Suche ${expanded ? 'ausblenden' : 'einblenden'}`"-->
  <!--  >-->
  <div class="q-pa-md q-mb-md">
    <div class="row q-gutter-md q-mb-md justify-center">
      <OrgTypeFilter v-if="activeEntity === 'actors'"/>
      <RegionFilter class="col-12 col-sm-6 col-md-3"/>
      <CategoryFilter class="col-12 col-sm-6 col-md-4"/>
      <EntitySearch class="col-12 col-sm-6 col-md-4"/>
    </div>
    <div class="row q-gutter-md justify-center">
      <EventFilter/>
    </div>
  </div>
  <div class="q-px-lg">
    <q-separator/>
  </div>
  <!--  </q-expansion-item>-->
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import OrgTypeFilter from 'components/filters/OrgTypeFilter.vue';
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';
import EventFilter from 'components/filters/EventFilter.vue';

const baseStore = useBaseStore()
const {activeEntity} = storeToRefs(baseStore)

const expanded = ref(true)
</script>
<style lang="scss" scoped>
.test {
  .q-expansion-item__container {
    .q-item {
      background: black;
    }
  }
}
</style>
