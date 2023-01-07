<template>
  <div class="map-list-toggle">
    <div
      @click="activeView = 'list'"
      :class="{active: activeView === 'list'}"
    >
      Liste
    </div>
    <div
      @click="activeView = 'map'"
      :class="{active: activeView === 'map'}"
    >
      Karte
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useBaseStore} from "src/stores/base-store";

const baseStore = useBaseStore()
const config = baseStore.config
const {activeView} = storeToRefs(baseStore)

</script>
<style lang="scss" scoped>
.map-list-toggle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2em;

  div {
    color: #333;
    background-color: #f2f2f2;
    width: 200px;
    text-align: center;
    padding: .3em;
    cursor: pointer;

    &:hover {
      background-color: #E6E6E6;
    }
  }

  .active {
    color: white;
    background-color: var(--brandColor);

    &:hover {
      background-color: var(--brandColor-lighter) !important;
    }
  }
}
</style>
