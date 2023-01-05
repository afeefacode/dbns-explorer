<template>
  <div class="map-list-toggle">
    <div
      @click="$emit('view-toggled', 'list')"
      :class="{active: props.activeView === 'list'}"
    >
      Liste
    </div>
    <div
      @click="$emit('view-toggled', 'map')"
      :class="{active: props.activeView === 'map'}"
    >
      Karte
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
    background-color: #f2f2f2;
    width: 200px;
    text-align: center;
    padding: .3em;

    &:hover {
      background-color: #E6E6E6 ;
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
