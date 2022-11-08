<template>
  <div class="q-mb-xl q-gutter-md">
    <OrgTypeFilter/>
    <div class="row q-gutter-md justify-center">
      <RegionFilter class="col-12 col-sm-3"/>
      <CategoryFilter class="col-12 col-sm-3"/>
    </div>
    <div class="row justify-center q-pl-sm q-pl-sm-none">
      <EntitySearch class="col-12 col-sm-3"/>
    </div>
  </div>
</template>

<script setup lang="ts">
// import {useConfigStore} from 'src/stores/config-store'
import OrgTypeFilter from 'components/filters/OrgTypeFilter.vue';
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';
// const config = useConfigStore().config


</script>
