<template>
  <q-page class="q-mb-xl">
    <q-spinner
      color="primary"
      size="3em"
      v-if="actorLoading"
    />
    <div v-else>
      <BackButton class="q-mb-md"/>
      <DetailCard class="q-mb-xl"/>
      <div class="q-px-lg">
        <h1 class="text-h4">{{ actor.name }}</h1>
        <div class="q-mb-xl">
          {{ actor.description }}
        </div>
        <DetailMap class="q-mb-xl"/>

        <h2 class="text-h5">Projekte des Akteurs</h2>
        <h2 class="text-h5">Veranstaltungen des Akteurs</h2>
        <q-separator />
        <h2 class="text-h5">Ähnliche Akteure</h2>

      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useActorStore} from 'stores/actor-store'
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import DetailMap from 'components/detail/DetailMap.vue'

const route = useRoute()
const actorId = route.params.id

// @todo edge-case, wenn falsche id in url aufgerufen wird

const actorStore = useActorStore()
actorStore.fetchActorDetails(actorId)

const {actorLoading, actor} = storeToRefs(actorStore)
</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
