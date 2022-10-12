<template>
  <q-card flat bordered class="my-card  details-drawer">
    <q-card-section class=details-drawer__header>
      <div class="row items-center no-wrap">
        <div class="col details-drawer__image" :style="`background-image: url(${entity.image_url})`">
        </div>
        <q-btn color="grey-7" round flat icon="clear" @click="$emit('closeDetails')"
               class="details-drawer__btn-close">
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section class="bg-white">
      <div class="text-overline">{{ entity.type }}</div>
      <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
      <div class="text-h5 q-mb-md">{{ displayed.name }}</div>
      <div class="text-caption text-grey list-card__short-description q-pr-md q-mb-md">
        {{ displayed.description }}
      </div>
      <div class="q-mb-md">
        <div v-if="entity.full_address">
          <q-icon name="home"/> &nbsp;
          {{ entity.full_address }}
        </div>
        <div v-if="entity.info_url">
          <q-icon name="language"/> &nbsp;
          <a :href="entity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>
        </div>
      </div>
      <DetailsButton :entity="entity"/>

    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps, computed} from 'vue'
import {shortenStringTo} from 'src/utils'
import DetailsButton from 'components/basic/DetailsButton.vue'

const props = defineProps({
  entity: {
    type: Object
  }
})

const displayed = computed(() => {
  return {
    name: shortenStringTo(50, props.entity.name),
    description: shortenStringTo(600, props.entity.description),
    info_url: shortenStringTo(60, props.entity.info_url)
  }
})
</script>

<style lang="scss" scoped>
.details-drawer {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  height: 100%;
  background: #ffffff;
  z-index: 3;
  width: 50%;

  &__header {
    background: #EEEDED;
  }

  &__image {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
  }

  &__btn-close {
    align-self: flex-start;
    position: relative;
    top: -1em;
    right: -1em;
  }
}

@media(max-width: 1100px) {
  .details-drawer {
    width: 100%;
  }
}
</style>
