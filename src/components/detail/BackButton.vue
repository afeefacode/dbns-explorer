<template>
  <q-btn
    flat
    :style="`color: ${config.brandColor}`"
    label="Zurück"
    icon="chevron_left"
    @click="$router.go(-1)"
  ></q-btn>
</template>
<script setup>
import {useConfigStore} from "src/stores/config-store";

const config = useConfigStore().config
</script>
