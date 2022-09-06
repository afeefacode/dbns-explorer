<template>
  <q-page>
    <div class="q-pl-md">
      <h1>Aktiv in Sachsen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque deleniti eaque explicabo ipsum nam omnis porro
        praesentium quaerat quasi rem, soluta voluptates? Beatae laudantium modi odit praesentium voluptatibus. Aperiam
        at culpa dicta dolorem dolorum ducimus, et incidunt iste libero minima quo reiciendis. Consequuntur delectus,
        molestias necessitatibus nemo neque odio omnis.</p>
      <RegionFilter/>
      <CategoryFilter/>
      <EntitySearch/>
      <MapView/>
    </div>
    <ListView/>
  </q-page>
</template>

<script setup lang="ts">
import CategoryFilter from 'components/filters/CategoryFilter.vue';
import EntitySearch from 'components/filters/EntitySearch.vue';
import RegionFilter from 'components/filters/RegionFilter.vue';
import MapView from 'components/map-view/MapView.vue';
import ListView from 'components/list-view/ListView.vue';
</script>
