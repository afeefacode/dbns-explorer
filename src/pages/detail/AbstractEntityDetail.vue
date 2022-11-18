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

        <div v-if="entityType === 'actor'">
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
import {onUpdated, ref} from 'vue'
import {useRoute} from 'vue-router'
import {storeToRefs} from 'pinia'
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import DetailMap from 'components/detail/DetailMap.vue'
import ListView from 'components/ListView.vue'
import {useBaseStore} from "stores/base-store";
import {useEntityStore} from "stores/entity-store";
import {entityRequests} from "src/api/entityRequests";
import {getTypeFromEntity, getGermanEntityName} from "src/utils";

const route = useRoute()
const entityId = route.params.id

const baseStore = useBaseStore()
const entityStore = useEntityStore()
const config = baseStore.config

entityStore.entityDetail = entityStore.entityList.data?.find(
  (entity: any) => entity.id === entityId
)
// if(!entityStore.entityDetail) {
//   console.log('fetching')
//@ts-ignore
//   await entityStore.fetchEntityDetails(entityRequests[baseStore.activeEntity].details, 3173)
// }

const {entityDetailLoading, entityDetail} = storeToRefs(entityStore)
const entityType = getTypeFromEntity(entityDetail.value)

//@ts-ignore
// entityStore.fetchEntityDetails(entityRequests[baseStore.activeEntity].list, entityId)

onUpdated(() => {
  entityStore.entityDetail = entityStore.entityList.data.find(
    (entity: any) => entity.id === route.params.id
  )
})
</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
