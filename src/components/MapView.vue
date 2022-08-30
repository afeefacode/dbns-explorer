<template>
  <div class="map-wrapper">
    <q-img src="../img/map-placeholder.png" class="map-placeholder" @click="detailsOpened = !detailsOpened"/>
    <q-card flat bordered class="my-card bg-grey-1 item-details" v-show="detailsOpened">
      <q-card-section class=item-details__header>
        <div class="row items-center no-wrap">
          <div class="col item-details__image" :style="`background-image: url(${item.image_url})`">
          </div>
          <q-btn color="grey-7" round flat icon="clear" @click="detailsOpened = !detailsOpened"
          class="item-details__btn-close">
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">{{ item.name }}</div>

        <q-btn flat>Akteur anzeigen</q-btn>

      </q-card-section>
    </q-card>
  </div>
  <q-toggle
    v-model="mapAsListFilter"
    checked-icon="filter_alt"
    color="green"
    label="Kartenausschnitt als Listenfilter"
    unchecked-icon="filter_alt"
    class="filter-toggler"
  />
</template>
<script setup>
import {ref, onUpdated} from 'vue'
import {useActivitiesStore} from 'stores/activities-store'

const detailsOpened = ref(true)
const mapAsListFilter = ref(true)

onUpdated(() => console.log('detailsOpened', detailsOpened))


const item = useActivitiesStore().activities[1]

</script>
<style lang="scss">
.map-wrapper {
  position: relative;
}

.map-placeholder {
  max-width: 1140px;
}

.item-details {
  position: absolute;
  top: 0;
  right: 0;
  float: right;
  width: 500px;
  height: 100%;
  background: #ffffff;

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

.filter-toggler {
  float: right;
  margin-right: 16px;
}

</style>
