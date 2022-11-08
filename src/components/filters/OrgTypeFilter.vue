<template>
  <div class="q-gutter-md flex flex-center">
    <q-chip v-for="type in orgTypes">
      {{ type }}
    </q-chip>
  </div>
</template>
<script setup>
const orgTypes = [
  'Gewerbliches Unternehmen',
  'Gemeinnütziger Verein',
  'Stiftung',
  'Genossenschaft',
  'Initiative',
  'Bildungseinrichtung',
  'Freiberufer',
  'Sonstige Organisation',
]
</script>
<style lang="scss" scoped>
.q-chip {
  background: #f2f2f2;
  cursor: pointer;
}
</style>
