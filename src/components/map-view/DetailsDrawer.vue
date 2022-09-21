<template>
  <q-card flat bordered class="my-card bg-grey-1 details-drawer">
    <q-card-section class=details-drawer__header>
      <div class="row items-center no-wrap">
        <div class="col details-drawer__image" :style="`background-image: url(${entity.image_url})`">
        </div>
        <q-btn color="grey-7" round flat icon="clear" @click="$emit('closeDetails')"
               class="details-drawer__btn-close">
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-h6">{{ entity.type }}</div>
      <div class="text-h6">{{ entity.name }}</div>

      <DetailsButton :entity="entity" />

    </q-card-section>
  </q-card>
</template>

<script setup>
import {defineProps} from 'vue'
import DetailsButton from 'components/basic/DetailsButton.vue'


const props = defineProps({
  entity: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.details-drawer {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  width: 50%;
  height: 100%;
  background: #ffffff;
  z-index: 3;

&__header {
  background: #EEEDED;
 }

&__image {
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   height: 200px;
 }

&__btn-close {
   align-self: flex-start;
   position: relative;
   top: -1em;
   right: -1em;
 }
}
</style>
