<template>
  <div
    class="entity-selector"
    @click="$emit('entity-click')"
  >
    <div
      class="entity-selector__icon"
      ref="entitySelectorIcon"
    >
      <EntitySvg :type="entityType"/>
    </div>
    <div class="entity-selector__text">
      {{ getGermanEntityName(entityType, 'category') }}
    </div>
  </div>
</template>
<script setup>
import {defineProps, onUpdated, ref, onMounted} from 'vue'
import {useBaseStore} from 'src/stores/base-store'
import {getGermanEntityName} from 'src/utils'
import EntitySvg from 'components/list/EntitySvg.vue'

const config = useBaseStore().config

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
    // entitySelectorIcon.value.style.backgroundColor = '#' + config.brandColor
    entitySelectorIcon.value.classList.add('entity-selector__icon--active')
    // console.log('    entitySelectorIcon.value.classList',     entitySelectorIcon.value.classList)

  } else {
    entitySelectorIcon.value.classList.remove('entity-selector__icon--active')

    // entitySelectorIcon.value.style.backgroundColor = '#D9D9D9'
  }
}

onMounted(setBackgroundColor)
onUpdated(setBackgroundColor)

</script>

<style lang="scss" scoped>

.entity-selector {
  width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    cursor: pointer;
    transition: background-color 100ms ease-in-out;

    &--active {
      background-color: var(--brandColor);

      &:hover {
        background-color: var(--brandColor-lighter) !important;
      }
    }

    &:hover {
      background-color: #bbb;
    }
  }

  &__text {
    text-transform: uppercase;
    color: $text-gray-50;
    cursor: pointer;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
  }
}

@media (max-width: 839px) {
  .entity-selector {
    width: auto;
    height: 3em;
    flex-direction: row;
    margin-bottom: 0;

    &__icon {
      scale: .5;
      margin: 0 -.7em 0 0;
    }
  }
}

</style>
