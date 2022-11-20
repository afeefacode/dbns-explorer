<template>
  <div>
    <div class="row justify-center text-h5 q-mb-xs">
      Akteure
    </div>
    <div class="row flex flex-center q-gutter-md ">
      <q-chip v-for="type in orgTypes">
        {{ type.title }}
      </q-chip>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from 'src/stores/base-store'
import {useCategoryStore} from 'src/stores/category-store'

const {orgTypes} = useCategoryStore()
</script>
<style lang="scss" scoped>

</style>
