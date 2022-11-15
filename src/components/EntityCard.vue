<template>
  <div :class="`entity-card q-pa-md items-start q-gutter-xs col-12 ${entity.type === 'Event' ? '' : 'col-md-6'}`">
    <q-card v-if="!entityStore.entityListLoading" class="list-card q-pl-md q-pb-md" bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-overline">{{ displayed.type }}</div>
          <div v-if="entity.type === 'Event'">{{ displayed.start_at }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{ displayed.title }}
          </div>
          <div v-if="entity.info_url">
            <q-icon name="language" class="q-mr-sm" :style="`color: #${config.brandColor}`"/>
            <span>
                <a :href="entity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>
              </span>
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
<!--      <q-card-actions>-->
<!--        <q-btn-->
<!--          label="Kurzinfos"-->
<!--          color="grey"-->
<!--          flat-->
<!--          dense-->
<!--          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"-->
<!--          @click="expanded = !expanded"-->
<!--        />-->
<!--      </q-card-actions>-->
<!--      <q-slide-transition>-->
<!--        <div v-show="expanded">-->
<!--          <q-separator/>-->
<!--          <q-card-section class="list-card__short-info">-->
<!--            <div v-if="entity.full_address">-->
<!--              <q-icon name="home" class="q-mr-sm"/>-->
<!--              <span>{{ entity.full_address }}</span>-->
<!--            </div>-->
<!--            <div v-if="entity.info_url">-->
<!--              <q-icon name="language" class="q-mr-sm"/>-->
<!--              <span>-->
<!--                <a :href="entity.info_url" target="_blank" :title="displayed.name">{{ displayed.info_url }}</a>-->
<!--              </span>-->
<!--            </div>-->
<!--          </q-card-section>-->
<!--        </div>-->
<!--      </q-slide-transition>-->
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
import {getGermanEntityName, getTypeFromEntity} from "src/utils";

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
displayed.description = props.entity.description ? shortenStringTo(100, props.entity.description) : ''
displayed.info_url = props.entity.info_url ? shortenStringTo(60, props.entity.info_url) : ''

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
