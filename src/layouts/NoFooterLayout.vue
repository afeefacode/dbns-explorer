<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useBaseStore} from "src/stores/base-store";

const router = useRouter()
const baseStore = useBaseStore()
const config = useBaseStore().config
</script>

<style>
.page-container {
  max-width: 1170px;
  margin: auto;
}
</style>
