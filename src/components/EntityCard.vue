<template>
  <div :class="`entity-card q-pa-md items-start q-gutter-xs col-12 ${entity.type === 'Event' ? '' : 'col-md-6'}`">
    <q-card v-if="!entityStore.entityListLoading" class="list-card q-pl-md q-pb-md" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline">{{ displayed.type }}</div>
          <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
          <div class="q-mt-sm q-mb-md">
            <div class="text-h5 break-word">
              {{ displayed.title }}
            </div>
            <div v-if="entity.info_url">
              <q-icon name="language" class="q-mr-sm" :style="`color: #${config.brandColor}`"/>
              <a :href="entity.info_url" target="_blank" :title="displayed.name" class="break-word">{{ displayed.info_url }}</a>
            </div>
          </div>
          <div label="test" class="text-grey list-card__short-description q-pr-xl q-mb-lg">
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
    </q-card>
    <q-card v-else class="list-card q-pa-xl">
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
    </q-card>
  </div>
</template>
<script setup>
import {ref, defineProps} from 'vue'
import DetailsButton from './DetailsButton.vue'
import {useBaseStore} from 'src/stores/base-store'
import {useEntityStore} from 'src/stores/entity-store'
import {getGermanEntityName, getTypeFromEntity, prettifyUrl} from "src/utils";

const config = useBaseStore().config
const entityStore = useEntityStore()

const props = defineProps({
  entity: {
    type: Object
  }
})
const shortenStringTo = (characters, string) => string.length > characters ? string.slice(0, characters - 4) + ' ...' : string

let displayed = {}
displayed.title = props.entity.title ? shortenStringTo(150, props.entity.title) : ''
displayed.short_description = props.entity.short_description ? shortenStringTo(200, props.entity.short_description) : ''
displayed.info_url = props.entity.info_url ? shortenStringTo(55, prettifyUrl(props.entity.info_url)) : ''

if (props.entity.offer_type?.key === 'NLS.Event') {
  let startAt = new Date(props.entity.start_at)
  const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  displayed.start_at = startAt.toLocaleDateString('de-DE', options)
}

displayed.type = getGermanEntityName(getTypeFromEntity(props.entity), 'singular')

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
  }

  &__image {
    width: 50%;
  }

  &__short-info {
    color: gray;
  }
}
</style>
