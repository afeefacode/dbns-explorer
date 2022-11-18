<template>
  <q-page class="q-mb-xl">
    <q-spinner
      color="primary"
      size="3em"
      v-if="entityDetailLoading"
    />
    <div v-else>
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
            <h2 class="text-h5">Projekte des Akteurs</h2>
            <router-link to="/">Alle Projekte des Akteurs anzeigen</router-link>

            <h2 class="text-h5">Veranstaltungen des Akteurs</h2>
            <router-link to="/">Alle Veranstaltungen des Akteurs anzeigen</router-link>
          </div>
        </div>
        <q-separator/>
        <h2 class="text-h5">Ähnliche {{ getGermanEntityName(entityType, 'plural') }}</h2>
        <ListView/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {onUpdated} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import DetailMap from 'components/detail/DetailMap.vue'
import ListView from 'components/ListView.vue'
import {useBaseStore} from "stores/base-store";
import {useEntityStore} from "stores/entity-store";
import {getTypeFromEntity, getGermanEntityName} from "src/utils";

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
