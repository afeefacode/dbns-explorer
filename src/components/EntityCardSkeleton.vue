<template>
  <div :class="`entity-card q-pa-md items-start q-gutter-xs col-12 ${entity.type === 'Event' ? '' : 'col-md-6'}`">
    <q-card class="list-card q-pa-xl">
      <div class="row">
        <q-skeleton type="text" class="col-1"/>
      </div>
      <div class="row">
        <q-skeleton type="text" class="col-6"/>
      </div>
      <div class="row" style="height: 90px">
        <q-skeleton type="text" class="col-8"/>
      </div>
      <q-skeleton type="QBtn"/>
    </q-card>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {useBaseStore} from 'src/stores/base-store'
import {useEntityStore} from 'src/stores/entity-store'

const config = useBaseStore().config

const props = defineProps({
  entity: {
    type: Object
  }
})

</script>
<style lang="scss" scoped>
.list-card {
  width: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: 0 5px 30px -10px rgb(18 63 82 / 30%) !important;

  &__short-description {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 50%;
  }

  &__short-info {
    color: gray;
  }
}
</style>
