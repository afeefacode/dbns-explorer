<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>


        <q-card-section>
          <div class="text-overline text-orange-9">{{ displayedType }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua.
          </div>
          <q-space/>
          <q-btn :label="displayedType + ' anzeigen'" class="actionbutton" text-color="white"
                 :style="'background: '+ displayedColor"></q-btn>
        </q-card-section>
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
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
          <q-card-section class="text-subitle2">
            {{ lorem }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {fetchOffers} from '../api/offers'


console.log('fetchOffers()', await fetchOffers())

const listItem = {
  type: 'actor',
  name: 'Aeracura - Natur- und Wildnisschule Leipzig',


}
let displayedType
let displayedColor = 'black'

switch (listItem.type) {
  case 'actor':
    displayedType = 'Akteur'
    displayedColor = '#457039'
    break;
  case 'project':
    displayedType = 'Projekt'
    displayedColor = '#DB9D37'
    break;
  case 'event':
    displayedType = 'Veranstaltung'
    displayedColor = '#9b3041'
    break;
}

const expanded = ref(false)
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
</style>
