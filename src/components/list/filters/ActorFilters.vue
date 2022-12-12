<template>
  <div>
    <div class="row flex flex-center q-gutter-md ">
      <q-chip v-for="type in orgTypes">
        {{ type.title }}
      </q-chip>
    </div>
  </div>
</template>
<script setup>
import {useCategoryStore} from 'stores/category-store'
const {orgTypes} = useCategoryStore()
</script>
