<template>
  <div class="map-list-toggle">
    <div
      @click="$emit('view-toggled', 'map')"
      :class="{active: activeView === 'map'}"
    >
      Karte
    </div>
    <div
      @click="$emit('view-toggled', 'list')"
      :class="{active: activeView === 'list'}"
    >
      Liste
    </div>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {useBaseStore} from "src/stores/base-store";

const config = useBaseStore().config
const props = defineProps({
  activeView: {
    type: String,
  }
})

</script>
<style lang="scss" scoped>
.map-list-toggle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2em;
  cursor: pointer;

  div {
    color: #333;
    background-color: #F8F8F8;
    width: 200px;
    text-align: center;
    padding: .3em;
  }

  .active {
    color: white;
    background-color: var(--brandColor)
  }
}
</style>
