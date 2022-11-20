<template>
  <div class="q-gutter-md flex flex-center">
    <q-chip v-for="type in orgTypes">
      {{ type.title }}
    </q-chip>
  </div>
</template>
<script setup>
import {useCategoryStore} from 'src/stores/category-store'
const {orgTypes} = useCategoryStore()
</script>
<style lang="scss" scoped>

</style>
