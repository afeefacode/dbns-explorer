<template>
  <div class="q-pa-md items-start q-gutter-xs col-xs-12 col-md-6">
    <q-card class="list-card q-pl-md q-pb-md" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline" :style="'color: '+ displayed.color">{{ displayed.type }}</div>
          <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ displayed.name }}
          </div>
          <div label="test" class="text-caption text-grey list-card__short-description q-pr-md q-mb-sm">
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
              <q-icon name="home"/> &nbsp;
              {{ entity.full_address }}
            </div>
            <div v-if="entity.info_url">
              <q-icon name="language"/> &nbsp;
              <a :href="entity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>
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
displayed.name = shortenStringTo(50, props.entity.name)
displayed.short_description = shortenStringTo(100, props.entity.short_description)
displayed.info_url = shortenStringTo(60, props.entity.info_url)

switch (props.entity.type) {
  case 'Actor':
    displayed.type = 'Akteur'
    displayed.color = '#457039'
    break;

  case 'Project':
    displayed.type = 'Projekt'
    displayed.color = '#DB9D37'
    break;

  case 'Service':
    displayed.type = 'Service'
    displayed.color = '#5fa93d'
    break;

  case 'Event':
    displayed.type = 'Veranstaltung'
    displayed.color = '#9b3041'
    let startAt = new Date(props.entity.start_at)
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    displayed.start_at = startAt.toLocaleDateString('de-DE', options)
    break;

  default:
    displayed.type = 'Angebot'
    displayed.color = '#5fa93d'
    break;
}

const expanded = ref(false)
</script>
<style lang="scss" scoped>
.list-card {
  width: 100%;
  border: 1px solid #D9D9D9;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;

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
