<template>
  <q-card class="detail-card">
    <div class="text-overline">{{ getGermanEntityName(getTypeFromEntity(entityDetail), 'singular') }}</div>
    <div class="row">

      <div :class="`detail-card__text col-12 ${entityDetail.image ? 'col-sm-7' : ''}`">
        <h1 class="text-h4 break-word">{{ entityDetail.title }}</h1>

        <div class="row" v-for="(detail, index) in details" :key="index">
          <div class="col" style="max-width: 35px">
            <q-icon :name="detail.icon"></q-icon>
          </div>
          <div class="col">
            <div v-if="detail.title"><b>{{ detail.title }}</b></div>
            <div class="col" v-html="detail.content"></div>
          </div>
        </div>
        <div v-if="entityDetail.type === 'NLS.Offer'" class="row">
          <div class="col" style="max-width: 35px">
            <q-icon name="group"></q-icon>
          </div>
          <div class="col">
            Dies ist ein Angebot von: <b>{{ entityDetail.actor?.title }}</b>&nbsp;
            <router-link :to="`/actors/${entityDetail.actor?.id}`">(Akteur anzeigen)</router-link>
          </div>
        </div>
      </div>
      <div
        v-if="false"
        class="detail-card__logo col-12 col-sm-5"
        :style="`background-image: url('${entityDetail.image}')`"
      />
    </div>
  </q-card>
</template>
<script setup>
import {ref, onUpdated} from 'vue'
import {storeToRefs} from "pinia/dist/pinia";
import {useEntityStore} from "stores/entity-store";
import {getTypeFromEntity, getGermanEntityName, shortenStringTo, prettifyUrl} from "src/utils";

const entityStore = useEntityStore()
const {entityDetail} = storeToRefs(entityStore)

const details = ref([])

const updateDetails = () => {
  details.value = []
  for (const [key, value] of Object.entries(entityDetail.value)) {
    if (value) {
      switch (key) {
        case 'locations':
          if (!value[0] || value[0]?.city === null) break;
          details.value.push({
            icon: 'home',
            content: `${value[0]?.street}, ${value[0]?.zip}, ${value[0]?.city}`
          })
          break;
        case 'info_url':
          details.value.push({
            icon: 'language',
            content: `<a href="${value}" target="_blank">${shortenStringTo(60, prettifyUrl(value))}</a>`
          })
          break;
        case 'requirements':
          details.value.push({
            title: 'Anforderungen:',
            icon: 'list_alt',
            content: value
          })
          break;
        case 'target_group':
          details.value.push({
            title: 'Zielgruppe:',
            icon: 'escalator_warning',
            content: value
          })
          break;
        case 'free':
          details.value.push({
            icon: 'euro',
            content: 'Kostenfreies Angebot'
          })
          break;
        case 'event_online':
          details.value.push({
            icon: 'laptop',
            content: 'Online Event'
          })
          break;
        case 'event_canceled':
          details.value.push({
            icon: 'close',
            content: `<span style="color: red"><b>Veranstaltung wurde abgesagt</b></span>`
          })
          break;
        case 'accessible':
          details.value.push({
            icon: 'accessible',
            content: 'Barrierefrei'
          })
          break;
        case 'child_friendly':
          details.value.push({
            icon: 'child_care',
            content: 'Kinderfreundlich'
          })
          break;
        case 'climate_protection':
          details.value.push({
            icon: 'nature',
            content: 'Klimaneutral'
          })
          break;
        case 'costs':
          details.value.push({
            icon: 'euro',
            content: value
          })
          break;
        case 'curriculum':
          details.value.push({
            title: 'Curriculum:',
            icon: 'subject',
            content: value
          })
          break;
        case 'property_list':
          details.value.push({
            title: 'Zusätzliche Informationen:',
            icon: 'info',
            content: `<div style="white-space: pre-line">${value}</div>`
          })
          break;
        case 'video_url':
          details.value.push({
            icon: 'slideshow',
            content: `<b>Video:</b> <a href="${value}" target="_blank">${prettifyUrl(value)}</a>`
          })
          break;
        default:
          break;
      }
    }
  }
}


updateDetails()
onUpdated(() => {
  updateDetails()
})

</script>
<style lang="scss">
.detail-card {
  background: #f8f8f8;
  box-shadow: none;
  padding: 2em;
  border-radius: 10px;

  &__text {
    .row {
      margin-bottom: 0.5em
    }

    .q-icon {
      scale: 1.3;
      color: #666;
    }
  }

  &__logo {
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}

@media (max-width: 598px) {
  .detail-card {
    &__text {
      order: 2;
    }

    &__logo {
      order: 1
    }
  }
}

@media (max-width: 1170px) {
  .detail-card {
    border-radius: 0;
  }
}
</style>
