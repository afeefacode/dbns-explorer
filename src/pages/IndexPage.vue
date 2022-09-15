<template>
  <q-page>
    <div class="q-pl-md entity-icons">
      <EntityIcon
        :active="active"
        @click="active = !active"
      >
        <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="41.5" cy="41.5" r="41.5" fill="#D9D9D9"/>
          <path
            d="M41.2601 35.6746C44.6151 35.6746 47.5791 36.4786 49.9874 37.5299C52.2104 38.5194 53.6101 40.7458 53.6101 43.1576V60.24H28.9101V43.1782C28.9101 40.7458 30.3097 38.5194 32.5327 37.5505C34.941 36.4786 37.905 35.6746 41.2601 35.6746ZM24.7934 36.19C27.0576 36.19 28.9101 34.3347 28.9101 32.0671C28.9101 29.7996 27.0576 27.9443 24.7934 27.9443C22.5292 27.9443 20.6767 29.7996 20.6767 32.0671C20.6767 34.3347 22.5292 36.19 24.7934 36.19ZM27.1193 38.4576C26.3577 38.3339 25.5961 38.2514 24.7934 38.2514C22.7556 38.2514 20.8208 38.6843 19.0712 39.4471C17.5481 40.1067 16.5601 41.5909 16.5601 43.2607V60.24H25.8226V43.1782C25.8226 41.4673 26.296 39.8593 27.1193 38.4576ZM57.7267 36.19C59.9909 36.19 61.8434 34.3347 61.8434 32.0671C61.8434 29.7996 59.9909 27.9443 57.7267 27.9443C55.4626 27.9443 53.6101 29.7996 53.6101 32.0671C53.6101 34.3347 55.4626 36.19 57.7267 36.19ZM65.9601 43.2607C65.9601 41.5909 64.9721 40.1067 63.4489 39.4471C61.6993 38.6843 59.7645 38.2514 57.7267 38.2514C56.924 38.2514 56.1624 38.3339 55.4008 38.4576C56.2241 39.8593 56.6976 41.4673 56.6976 43.1782V60.24H65.9601V43.2607ZM41.2601 21.76C44.6769 21.76 47.4351 24.5223 47.4351 27.9443C47.4351 31.3663 44.6769 34.1286 41.2601 34.1286C37.8432 34.1286 35.0851 31.3663 35.0851 27.9443C35.0851 24.5223 37.8432 21.76 41.2601 21.76Z"
            fill="white"/>
        </svg>
      </EntityIcon>
      <EntityIcon
        :active="active"
        @click="active = !active"
      >
        <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="41.5" cy="41.5" r="41.5" fill="#D9D9D9"/>
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M57.4177 22.7126H55.35V18.64H51.2148V22.7126H30.5384V18.64H26.4031V22.7126H24.3355C22.0611 22.7126 20.2002 24.5453 20.2002 26.7852V59.3662C20.2002 61.6061 22.0611 63.4388 24.3355 63.4388H57.4177C59.6921 63.4388 61.5529 61.6061 61.5529 59.3662V26.7852C61.5529 24.5453 59.6921 22.7126 57.4177 22.7126ZM47.7685 49.6544H54.6607V56.5466H47.7685V49.6544ZM33.9845 39.3165H27.0924V46.2086H33.9845V39.3165ZM27.0924 49.6544H33.9845V56.5466H27.0924V49.6544ZM44.3228 28.9783H37.4306V35.8704H44.3228V28.9783ZM37.4306 39.3165H44.3228V46.2086H37.4306V39.3165ZM44.3228 49.6544H37.4306V56.5466H44.3228V49.6544ZM47.7685 28.9783H54.6607V35.8704H47.7685V28.9783ZM54.6607 39.3165H47.7685V46.2086H54.6607V39.3165Z"
                fill="white"/>
        </svg>
      </EntityIcon>

      <div class="entity-icon">
        <q-icon name="img:/src/assets/entities/actor.svg" />
      </div>
      <q-icon name="app:actor" />
      <q-icon name="img:/src/assets/entities/actor.svg" />
   <div>
     <q-btn :style="`background: ${brandColor}; color: ${brandTextColor}`" icon="img:/src/assets/entities/actor.svg" label="Akteur anzeigen" />
     <q-btn color="primary" icon="img:/src/assets/entities/event.svg" label="Veranstaltung anzeigen" />

   </div>
    </div>
    <div>
      <h1>{{ heading }}</h1>
      <p>{{ introduction }}</p>
      <Filters/>
      <MapView/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EntityIcon from 'components/filters/entity-icons/EntityIcon.vue'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
import {ref} from 'vue'
import {useConfigStore} from 'src/stores/config-store'

const brandColor = useConfigStore().config.brandColor
const brandTextColor = useConfigStore().config.brandTextColor
const heading = useConfigStore().config.heading
const introduction = useConfigStore().config.introduction

const active = ref(false)
</script>
<style lang="scss">

</style>
