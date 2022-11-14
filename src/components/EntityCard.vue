<template>
  <div :class="`entity-card q-pa-md items-start q-gutter-xs col-12 ${entity.type === 'Event' ? '' : 'col-md-6'}`">
    <q-card class="list-card q-pl-md q-pb-md" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline">{{ displayed.type }}</div>
          <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ displayed.name }}
          </div>
          <div label="test" class="text-grey list-card__short-description q-pr-md q-mb-sm">
            {{ displayed.short_description }}
          </div>
          <q-space/>
          <DetailsButton :entity="entity"/>
        </q-card-section>
        <q-img
          v-if="entity.image_url"
          :src="entity.image_url"
          class="list-card__image"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          label="Kurzinfos"
          color="grey"
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator/>
          <q-card-section class="list-card__short-info">
            <div v-if="entity.full_address">
              <q-icon name="home" class="q-mr-sm"/>
              <span>{{ entity.full_address }}</span>
            </div>
            <div v-if="entity.info_url">
              <q-icon name="language" class="q-mr-sm"/>
              <span>
                <a :href="entity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>
              </span>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import DetailsButton from './DetailsButton.vue'

const props = defineProps({
  entity: {
    type: Object
  }
})
const shortenStringTo = (characters, string) => string.length > characters ? string.slice(0, characters - 4) + ' ...' : string

let displayed = {}
displayed.title = props.entity.title ? shortenStringTo(50, props.entity.title) : ''
displayed.description = props.entity.description ? shortenStringTo(100, props.entity.description) : ''
displayed.info_url = props.entity.info_url ? shortenStringTo(60, props.entity.info_url) : ''

switch (props.entity.type) {
  case 'NLS.Actor':
    displayed.type = 'Akteur'
    break;

  case 'NLS.Project':
    displayed.type = 'Projekt'
    break;

  case 'NLS.Service':
    displayed.type = 'Service'
    break;

  case 'NLS.Event':
    displayed.type = 'Veranstaltung'
    let startAt = new Date(props.entity.start_at)
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    displayed.start_at = startAt.toLocaleDateString('de-DE', options)
    break;

  default:
    displayed.type = 'Angebot'
    break;
}

const expanded = ref(false)
</script>
<style lang="scss" scoped>
.list-card {
  width: 100%;
  border: 0;
  border-radius: 0;
  box-shadow: 0 5px 30px -10px rgb(18 63 82 / 30%) !important;

  &__short-description {
    display: flex;
    align-items: center;
    height: 60px;
  }

  &__image {
    width: 50%;
  }

  &__short-info {
    color: gray;
  }
}
</style>
