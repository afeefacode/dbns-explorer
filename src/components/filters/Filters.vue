<template>
  <div class="filters">
    <div class="row entity-icons">
      <EntitySelector
        v-for="entity in config.entities"
        :entity-name="entity.name"
        :active="entity.name === activeEntity"
        @entity-click="activeEntity = entity.name"
      />
    </div>
    <!--  <RegionFilter/>-->
    <!--  <CategoryFilter/>-->
  </div>
</template>

<script setup lang="ts">
import {onUpdated, ref} from 'vue'
import {useConfigStore} from 'src/stores/config-store'
import EntitySelector from 'components/filters/EntitySelector.vue'
// import CategoryFilter from 'components/filters/CategoryFilter.vue';
// import RegionFilter from 'components/filters/RegionFilter.vue';

const config = useConfigStore().config
const activeEntity = ref('actor')

const entityClicked = (entityName: string) => {
}

onUpdated(()=> {
})

</script>

<style lang="scss" scoped>
.filters {
  margin-bottom: 2em;

  .entity-icons {
    justify-content: center;
  }
}
</style>
