<template>
  <q-page class="q-mb-xl justify-center">
    <h1 class="text-h3 text-center">Leider nichts gefunden</h1>
    <div class="text-center"> Unter dem von dir aufgerufenen Link können wir leider nichts finden
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {useConfigStore} from 'stores/config-store'

const config = useConfigStore().config
</script>
