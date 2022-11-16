<template>
  <q-btn
    flat
    label="Zurück"
    icon="chevron_left"
    @click="$router.go(-1)"
  ></q-btn>
</template>
<script setup>
import {useBaseStore} from "src/stores/base-store";
const config = useBaseStore().config
</script>
