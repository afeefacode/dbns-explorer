<template>
  <q-btn
    flat
    label="Zurück zur Übersicht"
    icon="chevron_left"
    @click="openListPage"
  ></q-btn>
</template>
<script setup>
import {useRouter} from 'vue-router'
import {useBaseStore} from "src/stores/base-store";

const config = useBaseStore().config
const router = useRouter()

const openListPage = () => {
  router.push('/')
  window.parent.postMessage({
    type: "scroll_to_top_of_iframe",
  }, '*')
}
</script>
