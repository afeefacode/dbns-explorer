<template>
  <div :class="`entity-card q-pa-md items-start q-gutter-xs col-12 ${entityType === 'event' ? '' : 'col-md-6'}`">
    <q-card v-if="!entityStore.entityListLoading" class="list-card" bordered>
      <div class="justify-between row">
        <div class="list-card__text col-12 col-sm-8 q-pa-lg">
          <div class="text-overline">{{ getGermanEntityName(entityType, 'singular') }}</div>
          <div v-if="entityType === 'event' && displayed.time" class="list-card__times">{{ displayed.time.start }} - {{
              displayed.time.end
            }}
          </div>
          <div
            v-if="cities"
            class="list-card__city"
            v-html="cities"
          >
          </div>
          <div class="q-mt-sm q-mb-md">
            <div class="text-h5 break-word list-card__title">
              {{ displayed.title }}
            </div>
            <div v-if="entity.info_url" class="list-card__url">
              <q-icon name="language" class="q-mr-sm" :style="`color: #${config.brandColor}`"/>
              <a :href="entity.info_url" target="_blank" :title="displayed.name"
                 class="break-word list-card__info-url">
                {{ displayed.info_url }}
              </a>
            </div>
          </div>
          <div label="test" class="text-grey list-card__short-description q-pr-md q-mb-lg">
            {{ displayed.short_description }}
          </div>
          <q-space/>
          <DetailsButton :entity="entity"/>
        </div>
        <div
          class="list-card__image col-12 col-sm-4"
          v-if="entity.image_url"
          :style="`background-image: url('${entity.image_url}?width=600&height=600')`"
        />
      </div>
    </q-card>
    <q-card v-else class="list-card">
      <div class="q-pa-xl">
        <div class="row">
          <q-skeleton type="text" class="col-1"/>
        </div>
        <div class="row">
          <q-skeleton type="text" class="col-6"/>
        </div>
        <div class="row" style="height: 90px">
          <q-skeleton type="text" class="col-8"/>
        </div>
        <q-skeleton type="QBtn"/>
      </div>
    </q-card>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import {useBaseStore} from 'src/stores/base-store'
import {useEntityStore} from 'src/stores/entity-store'
import {
  getGermanEntityName,
  getTypeFromEntity,
  prettifyUrl,
  getEventDatesForDisplay,
  shortenStringTo,
  getCitiesFromLocations
} from "src/utils";
import DetailsButton from './DetailsButton.vue'

const config = useBaseStore().config
const entityStore = useEntityStore()

const props = defineProps({
  entity: {
    type: Object
  }
})

let cities = getCitiesFromLocations(props.entity.locations)

const entityType = getTypeFromEntity(props.entity)

let displayed = {}
displayed.title = props.entity.title ? shortenStringTo(60, props.entity.title) : ''
displayed.short_description = props.entity.short_description ? shortenStringTo(150, props.entity.short_description) : ''
displayed.info_url = props.entity.info_url ? shortenStringTo(55, prettifyUrl(props.entity.info_url)) : ''

if (entityType === 'event' && props.entity.times[0]) {
  displayed.time = getEventDatesForDisplay(props.entity.times[0])
}

const infoUrlWidth = entityType === 'event' ? '400px'
  : props.entity.image_url ? '200px' : '400px'

</script>
<style lang="scss" scoped>
.list-card {
  width: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: 0 5px 30px -10px rgb(18 63 82 / 30%) !important;

  &__times {
    color: var(--brandColor);
    font-size: 16px;
    letter-spacing: .5px;
  }

  &__city {
    color: #888;
    letter-spacing: 1px;
  }

  &__title {
    letter-spacing: 1px;
  }

  &__url {
    display: flex;
    align-items: center;
  }

  &__info-url, &__title {
    //width: v-bind(infoUrlWidth)
  }

  &__short-description {
    display: flex;
    align-items: center;
  }

  &__image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  &__short-info {
    color: gray;
  }
}

@media (max-width: 599px) {
  .list-card {
    &__text {
      order: 2;
    }

    &__image {
      order: 1;
      height: 150px;
    }
  }
}
</style>
