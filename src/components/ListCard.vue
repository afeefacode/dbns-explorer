<template>
  <div class="q-pa-md items-start q-gutter-xs col-xs-12 col-md-6">
    <q-card class="list-card q-pl-md q-pb-md" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline" :style="'color: '+ displayed.color">{{ displayed.type }}</div>
          <div v-if="activity.type === 'Event'">{{ displayed.start_at }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ displayed.name }}</div>
          <div class="text-caption text-grey list-card__short-description q-pr-md q-mb-sm">
            {{ displayed.short_description }}
          </div>
          <q-space/>
          <q-btn :label="displayed.type + ' anzeigen'" class="actionbutton" text-color="white"
                 :style="'background: '+ displayed.color"></q-btn>
        </q-card-section>
        <q-img
          v-if="activity.image_url"
          :src="activity.image_url"
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
            <div v-if="activity.full_address">
              <q-icon name="home"/> &nbsp;
              {{ activity.full_address }}
            </div>
            <div v-if="activity.info_url">
              <q-icon name="language"/> &nbsp;
              <a :href="activity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script setup>
import {ref, defineProps} from 'vue'

const props = defineProps({
  activity: {
    type: Object
  }
})
const shortenStringTo = (characters, string) => string.length > characters ? string.slice(0, characters - 4) + ' ...' : string

let displayed = {}
displayed.name = shortenStringTo(50, props.activity.name)
displayed.short_description = shortenStringTo(100, props.activity.short_description)
displayed.info_url = shortenStringTo(60, props.activity.info_url)

switch (props.activity.type) {
  case 'Actor':
    displayed.type = 'Akteur'
    displayed.color = '#457039'
    break;

  case 'Project':
    displayed.type = 'Projekt'
    displayed.color = '#DB9D37'
    break;

  case 'Event':
    displayed.type = 'Veranstaltung'
    displayed.color = '#9b3041'
    let startAt = new Date(props.activity.start_at)
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    displayed.start_at = startAt.toLocaleDateString('de-DE', options)
    console.log('displayed.start_at', displayed.start_at)
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
  border: 0;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  &__short-description {
    display: flex;
    align-items: center;
    height: 100px;
  }

  &__image {
    width: 50%;
  }

  &__short-info {
    color: gray;
  }
}
</style>
