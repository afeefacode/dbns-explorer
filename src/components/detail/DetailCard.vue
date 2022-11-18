<template>
  <q-card class="detail-card">
    <div class="text-overline">{{ getGermanEntityName(getTypeFromEntity(entity), 'singular') }}</div>
    <div class="row">

      <div :class="`detail-card__text col-12 ${entity.image ? 'col-sm-7' : ''}`">
        <h1 class="text-h4">{{ entity.title }}</h1>

        <div class="row" v-for="detail in details">
          <div class="col-1">
            <q-icon :name="detail.icon"></q-icon>
          </div>
          <div class="col">
            <div v-if="detail.title"><b>{{ detail.title }}</b></div>
            <div class="col" v-html="detail.content">
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="false"
        class="detail-card__logo col-12 col-sm-5"
        :style="`background-image: url('${entity.image}')`"
      />

    </div>
  </q-card>
</template>
<script setup>
import {defineProps} from "vue";
import {getTypeFromEntity, getGermanEntityName, shortenStringTo} from "src/utils";

const props = defineProps({
  entity: {
    type: Object
  }
})



const details = []

for (const [key, value] of Object.entries(props.entity)) {
  if (value) {
    switch (key) {
      case 'locations':
        details.push({
          icon: 'home',
          content: `${value[0].street}, ${value[0].zip}, ${value[0].city}`
        })
        break;
      case 'info_url':
        details.push({
          icon: 'language',
          content: `<a href="${value}" target="_blank">${shortenStringTo( 60,value)}</a>`
        })
        break;
      case 'requirements':
        details.push({
          title: 'Anforderungen:',
          icon: 'list_alt',
          content: value
        })
        break;
      case 'target_group':
        details.push({
          title: 'Zielgruppe:',
          icon: 'escalator_warning',
          content: value
        })
        break;
      case 'free':
        details.push({
          icon: 'euro',
          content: 'Kostenfreies Angebot'
        })
        break;
      case 'event_online':
        details.push({
          icon: 'laptop',
          content: 'Online Event'
        })
        break;
      default:
        break;
    }
  }
}

if(props.entity.type === 'NLS.Offer') {
  details.push({
    icon: 'group',
    content: `Dies ist ein Angebot von: <b>${props.entity.actor.title}</b>`
  })
}

</script>
<style lang="scss" scoped>
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
      scale: 1.5;
      color: #444;
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
</style>
