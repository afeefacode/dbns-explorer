<template>
  <q-card class="detail-card">
    <div class="text-overline">Akteur</div>
    <div class="row">
      <div class="detail-card__text col-12 col-sm-7">
        <h1 class="text-h4">{{ actor.name }}</h1>
        <div class="row" v-for="detail in details">
          <div class="col-1">
            <q-icon :name="detail.icon"></q-icon>
          </div>
          <div class="col" v-html="detail.content"></div>
        </div>
      </div>
      <div
        class="detail-card__logo col-12 col-sm-5"
        :style="`background-image: url('${actor.organization_logo_url}')`"
      />
    </div>
  </q-card>
</template>
<script setup>
import {useActorStore} from 'stores/actor-store'
const actor = useActorStore().actor

const details = [
  {icon: 'home', content: actor.full_address},
  {
    icon: 'language',
    content: `<a href="${actor.organization_url}">${actor.organization_url}</a>`
  },
  {icon: 'phone', content: actor.phone_primary},
  {
    icon: 'mail_outline',
    content: `<a href="mailto:${actor.email}">${actor.email}</a>`

  },
  {icon: 'person', content: actor.full_address},
]
</script>
<style lang="scss" scoped>
.detail-card {
  background: #f8f8f8;
  box-shadow: none;
  padding: 2em;

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
