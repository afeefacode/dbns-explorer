<template>
  <q-page class="q-mb-xl">
    <q-spinner
      color="primary"
      size="3em"
      v-if="actorLoading"
    />
    <div v-else>
      <BackButton class="q-mb-md"/>
      <DetailCard/>
    </div>
    <!--    <ListView />-->
  </q-page>
</template>

<script setup lang="ts">
import {useRoute} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useActorStore} from 'stores/actor-store'
import BackButton from 'components/detail/BackButton.vue'
import DetailCard from 'components/detail/DetailCard.vue'
import Filters from 'components/filters/Filters.vue';
import MapView from 'components/map-view/MapView.vue';
// import ListView from 'components/ListView.vue'


const route = useRoute()
const actorId = route.params.id

const actorStore = useActorStore()
actorStore.fetchActorDetails(actorId)

const {actorLoading, actor} = storeToRefs(actorStore)
</script>

<style lang="scss" scoped>
.introduction {
  margin-bottom: 2em;
}
</style>
