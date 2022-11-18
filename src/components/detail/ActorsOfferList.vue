<template>
  <div v-for="offer in getOfferList()">
    <div v-if="entityDetail.offers[offer.key + 's']">
      <h2 class="text-h5">{{ getGermanEntityName(offer.key, 'plural') }} des Akteurs</h2>
      <div v-for="(offers, key) in entityDetail.offers"></div>
      <div class="row">
        <EntityCard v-for="entity in  entityDetail.offers" :entity="entity" :key="entity.id"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import {storeToRefs} from 'pinia'
import {useEntityStore,} from 'src/stores/entity-store'
import {getOfferList, getGermanEntityName} from 'src/utils'
import EntityCard from 'components/EntityCard.vue'

const entityStore = useEntityStore()
const {entityDetail} = storeToRefs(entityStore)
console.log('entityDetail.offers', entityDetail.offers)
</script>
