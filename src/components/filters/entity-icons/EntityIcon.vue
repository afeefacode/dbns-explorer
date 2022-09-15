<template>
  <div class="entity-icon">
    <slot></slot>
  </div>
</template>
<script setup>
import {defineProps, onUpdated} from 'vue'
import {useConfigStore} from 'src/stores/config-store'

const brandColor = useConfigStore().config.brandColor

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  }
})

onUpdated(() => {
  const svgCircle = document.querySelector('.entity-icon svg circle')
  svgCircle.style.fill = props.active ? brandColor : '#D9D9D9'
})
</script>
