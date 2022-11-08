<template>
  <q-input
    filled
    dense
    v-model="text"
    label="Suchen"
  >
    <template v-slot:prepend>
      <q-icon name="search"/>
    </template>
  </q-input>
</template>
<script setup>
import {ref} from 'vue'
const text = ref(null)
</script>
