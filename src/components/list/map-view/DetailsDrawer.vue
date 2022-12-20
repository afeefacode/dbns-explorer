<template>
  <q-card
    flat
    bordered
    class="details-drawer"
  >
    <q-card-section
      class=details-drawer__header
      :style="`background-image: url('${headerBackground}')`"
    >
      <div class="row items-center no-wrap">
        <q-btn
          color="grey-7"
          round
          icon="clear"
          @click="$emit('closeDetails')"
          class="details-drawer__btn-close"
        >
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section class="bg-white details-drawer__content">
      <div>
        <div class="text-overline">{{ getGermanEntityName(getTypeFromEntity(entity), 'singular') }}</div>
        <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
        <div class="text-h5 q-mb-md">{{ displayed.title }}</div>
        <div v-if="entity.info_url">
          <q-icon name="language" class="q-mr-sm" :style="`color: #${config.brandColor}`"/>
          <a :href="entity.info_url" target="_blank" :title="displayed.name"
             class="break-word list-card__info-url">{{ displayed.info_url }}</a>
        </div>
        <div class="text-caption text-grey list-card__short-description q-pr-md q-mb-md">
          {{ displayed.description }}
        </div>
        <div class="q-mb-md">
          <div v-if="entity.full_address">
            <q-icon name="home" class="q-mr-sm"/>
            <span>{{ entity.full_address }}</span>
          </div>
        </div>
        <DetailsButton :entity="entity"/>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps, computed, ref, onUpdated} from 'vue'
import {useBaseStore} from "stores/base-store";
import {shortenStringTo, getGermanEntityName, getTypeFromEntity} from 'src/utils'
import DetailsButton from 'src/components/DetailsButton.vue'

const props = defineProps({
  entity: {
    type: Object,
    default: {},
  },
})

const config = useBaseStore().config

const displayed = computed(() => {
  return {
    title: shortenStringTo(100, props.entity.title),
    description: shortenStringTo(300, props.entity.description),
    info_url: shortenStringTo(60, props.entity.info_url)
  }
})

const headerBackground = ref(props.entity.image_url
  ? props.entity.image_url + '?width=600&height=600'
  : './src/img/no-image-background.png')

onUpdated(() => {
  headerBackground.value = props.entity.image_url
    ? +props.entity.image_url + '?width=600&height=600'
    : './src/img/no-image-background.png'
})
</script>

<style lang="scss">
.details-drawer {
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  background: #ffffff;
  z-index: 3;
  width: 50%;
  overflow-y: auto;
  overflow-x: hidden;

  &__header {
    display: flex;
    justify-content: flex-end;
    height: 200px;
    background-color: #EEEDED;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-image: v-bind('headerBackground');
  }

  &__btn-close {
    align-self: flex-start;
    position: relative;
    top: -1em;
    right: -1em;
    border-radius: 20px;
    font-size: 12px;
    background-color: white !important;

    .q-icon {
      color: #aaa;
      top: 1px;
    }
  }

  &__content {
    display: flex;
    align-items: center;

  }
}

@media(max-width: 1100px) {
  .details-drawer {
    width: 100%;
  }
}
</style>
