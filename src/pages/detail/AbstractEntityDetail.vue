<template>
  <q-page class="q-mb-xl">

    <div v-if="!entityDetailLoading">
      <BackButton class="q-mb-md"/>
      <DetailCard :entity="entityDetail" class="q-mb-xl"/>
      <div class="q-px-lg">
        <h1 class="text-h5">{{ entityDetail.title }}</h1>
        <div class="q-mb-xl" style="white-space: pre-line">
          {{ entityDetail.description }}
        </div>
        <!--        <DetailMap class="q-mb-xl"/>-->

        <div v-if="getTypeFromEntity(entityDetail) === 'actor'">
          <div class="q-mb-xl">
            <ActorsOfferList/>
          </div>
        </div>
        <q-separator/>
        <h2 class="text-h5">Ähnliche {{ getGermanEntityName(entityType, 'plural') }}</h2>
        <ListView/>
      </div>
    </div>

    <div v-else  class="q-ma-md">
      <q-skeleton type="QBtn" class="q-mb-md"/>
      <q-card class="detail-card">
        <div class="row  q-mb-md">
          <q-skeleton type="text" class="col-3"/>
        </div>
        <div class="row q-mb-md" style="height: 50px">
          <q-skeleton type="text" class="col-8"/>
        </div>
        <div v-for="i in 3" class="row flex-center" style="display: flex; justify-content: flex-start; height: 30px;">
          <q-skeleton type="circle" style="scale: .5" class="q-mr-xl"/>
          <q-skeleton type="text" class="col-3"/>
        </div>
      </q-card>

      <div class="q-ma-lg">
        <div class="row" style="height: 70px">
          <q-skeleton type="text" class="col-8"/>
        </div>
        <div v-for="i in 10" class="row">
          <q-skeleton type="text" :class="`col-${9 + Math.floor(Math.random()* 4)}`"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {onUpdated} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useBaseStore} from "stores/base-store";
import {useEntityStore} from "stores/entity-store";
import {getTypeFromEntity, getGermanEntityName, getOfferList} from "src/utils";
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import DetailMap from 'components/detail/DetailMap.vue'
import ListView from 'components/ListView.vue'
import ActorsOfferList from 'components/detail/ActorsOfferList.vue'

const route = useRoute()

const baseStore = useBaseStore()
const entityStore = useEntityStore()
const router = useRouter()

const config = baseStore.config

const {entityDetailLoading, entityDetail} = storeToRefs(entityStore)
const entityType = getTypeFromEntity(entityDetail.value)
entityStore.fetchEntityDetails(baseStore.activeEntity, route.params.id)

onUpdated(() => {
  const nextEntity = router.currentRoute.value.fullPath.split('/')[1]
  baseStore.activeEntity = nextEntity
  entityStore.fetchEntityDetails(nextEntity, route.params.id)
})
</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
