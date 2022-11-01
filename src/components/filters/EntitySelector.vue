<template>
  <div
    class="entity-selector"
    @click="$emit('entity-click')"
  >
    <div
      class="entity-selector__icon"
      ref="entitySelectorIcon"
    >
      <q-icon :name="`img:/src/assets/svg/${entityType}.svg`"/>
    </div>
    <div class="entity-selector__text">
      {{ displayedNames[entityType].plural }}
    </div>
  </div>
</template>
<script setup>
import {defineProps, onUpdated, ref, onMounted} from 'vue'
import {useConfigStore} from 'src/stores/config-store'

const config = useConfigStore().config

const props = defineProps({
  entityType: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: false,
  }
})

const entitySelectorIcon = ref(null)

const setBackgroundColor = () => {
  if (props.active) {
    entitySelectorIcon.value.style.backgroundColor = config.brandColor
  } else {
    entitySelectorIcon.value.style.backgroundColor = '#D9D9D9'
  }
}

onMounted(setBackgroundColor)
onUpdated(setBackgroundColor)

const displayedNames = {
  actor: {
    singular: 'Akteur',
    plural: 'Akteure'
  },
  project: {
    singular: 'Projekt',
    plural: 'Projekte'
  },
  event: {
    singular: 'Veranstaltung',
    plural: 'Veranstaltungen'
  },
  job: {
    singular: 'Job',
    plural: 'Jobs'
  },
  education: {
    singular: 'Bildungsangebot',
    plural: 'Bildung'
  },
  consultation: {
    singular: 'Beratungsangebot',
    plural: 'Beratung'
  },
  trade: {
    singular: 'Shop',
    plural: 'Fairer Handel'
  },
}
</script>

<style lang="scss" scoped>

.entity-selector {
  width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2em;

  &__icon {
    width: 5em;
    height: 5em;
    border-radius: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: .5em;
    background-color: #D9D9D9;

    .q-icon {
      width: 3em;
      height: 3em;
    }
  }

  &__text {
    text-transform: uppercase;
    color: $text-gray-50;
  }
}

</style>
