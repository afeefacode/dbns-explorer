<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
    <div v-if="!isInIframe()" class="footer">
        <router-link to="/impressum" class="text-white">Impressum</router-link>
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {useBaseStore} from "src/stores/base-store";
import {isInIframe} from 'src/utils'

const router = useRouter()
const baseStore = useBaseStore()
const config = useBaseStore().config
</script>

<style>
.page-container {
  max-width: 1170px;
  margin: auto;
}

.footer {
  margin-top: 20em;
  display: flex;
  justify-content: flex-end;
  padding: .5em 2em;
  background: var(--brandColor);
}
</style>
