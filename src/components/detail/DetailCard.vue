<template>
  <q-card class="detail-card">
    <div class="text-overline">{{ getGermanEntityName(getTypeFromEntity(entity), 'singular') }}</div>
    <div class="row">
      <div class="detail-card__text col-12 col-sm-7">
        <h1 class="text-h4">{{ entity.title }}</h1>
        <div class="row" v-for="detail in details">
          <div class="col-1">
            <q-icon :name="detail.icon"></q-icon>
          </div>
          <div class="col" v-html="detail.content"></div>
        </div>
      </div>
      <div
        class="detail-card__logo col-12 col-sm-5"
        :style="`background-image: url('${entity.info_url}')`"
      />
    </div>
  </q-card>
</template>
<script setup>
import {defineProps} from "vue";
// import {useEntityStore} from 'stores/entity-store'
// const entity = useEntityStore().entityDetail
import {getTypeFromEntity, getGermanEntityName} from "src/utils";

const props = defineProps({
  entity: {
    type: Object
  }
})

const details = props.entity.info_url
  ? [
    // {icon: 'home', content: entity.full_address},
    {
      icon: 'language',
      content: `<a href="${props.entity.info_url}" target="_blank">${props.entity.info_url}</a>`
    },
    // {icon: 'phone', content: entity.phone_primary},
    // {
    //   icon: 'mail_outline',
    //   content: `<a href="mailto:${entity.email}">${entity.email}</a>`
    //
    // },
    // {icon: 'person', content: entity.full_address},
  ]
  : null
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
