<template>
  <q-btn
    flat
    label="Zurück zur Übersicht"
    icon="chevron_left"
    @click="$router.push('/')"
  ></q-btn>
</template>
<script setup>
import {useBaseStore} from "src/stores/base-store";
const config = useBaseStore().config
</script>
