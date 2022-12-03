<template>
  <q-page class="q-my-xl">
    <div v-if="!entityDetailLoading">
      <BackButton class="q-mb-md"/>
      <DetailCard :entity="entityDetail" class="q-mb-xl"/>
      <div class="q-px-lg">
        <h1 class="text-h5 break-word">{{ entityDetail.title }}</h1>
        <div class="q-mb-xl" style="white-space: pre-line">
          <div v-if="entityDetail.description">
            {{ entityDetail.description }}
          </div>
          <div v-else-if="entityDetail.short_description">
            {{ entityDetail.short_description }}
          </div>
          <div v-else>
            <i>Keine Beschreibung vorhanden</i>
          </div>
        </div>
        <div class="q-mb-xl">
          <!--          <DetailMap/>-->
        </div>
      </div>
      <div>
        <div class="q-mb-xl">
          <ActorsOfferList v-if="getTypeFromEntity(entityDetail) === 'actor'"/>
        </div>
      </div>
      <div class="entity-detail__similar-entities">
        <h2 class="text-h5 q-mt-xl q-ml-lg">Ähnliche {{
            getGermanEntityName(getTypeFromEntity(entityDetail), 'plural')
          }}</h2>
<!--        <ListView-->
<!--          v-for="entityType in activeEntities[0]"-->
<!--          :entityType="entityType"-->
<!--          :key="entityType"-->
<!--        />-->
      </div>
    </div>
    <EntityDetailSkeleton v-else/>
  </q-page>
</template>

<script setup lang="ts">
import {onUpdated} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useBaseStore} from "stores/base-store";
import {useEntityStore} from "stores/entity-store";
import {getTypeFromEntity, getGermanEntityName} from "src/utils";
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import DetailMap from 'components/detail/DetailMap.vue'
import EntityDetailSkeleton from 'components/detail/EntityDetailSkeleton.vue'
import ListView from 'components/ListView.vue'
import ActorsOfferList from 'components/detail/ActorsOfferList.vue'

const route = useRoute()
const baseStore = useBaseStore()
const entityStore = useEntityStore()
const router = useRouter()

const config = baseStore.config

const {entityDetailLoading, entityDetail} = storeToRefs(entityStore)
//@ts-ignore
entityStore.fetchEntityDetails(route.params.entityType, route.params.id)

onUpdated(() => {
  const nextEntity = router.currentRoute.value.fullPath.split('/')[1]
  // baseStore.activeEntity = nextEntity
  entityStore.fetchEntityDetails(nextEntity, route.params.id)
})
</script>

<style lang="scss" scoped>
.entity-detail {
  &__similar-entities {
    background: #f3f3f3;
    margin-top: 8em;
    padding: 1em;
    border-radius: 10px
  }
}

@media (max-width: 1170px) {
  .entity-detail__similar-entities {
    border-radius: 0;
  }
}
</style>
