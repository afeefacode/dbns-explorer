<template>
  <div>
    <div class="row justify-center q-mb-sm">
      <q-chip v-for="timeSpan in defaultTimeSpans" @click="setTimeSpan(timeSpan)" clickable
              :class="isActiveTimeSpan(timeSpan) ? 'q-chip--active' : ''"
      >
        {{ timeSpan.lable }}
      </q-chip>
    </div>
    <div class="row q-gutter-md justify-center">
      <q-input
        v-for="boundary in ['startDate', 'endDate']"
        v-model="activeFilters.events[boundary]"
        :label="`Zeitraum ${boundary === 'startDate' ? 'von' : 'bis'}`"
        dense filled clearable mask="##.##.####"
        :class="activeFilters.events[boundary] ? 'filter--active' : ''"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="activeFilters.events[boundary]" :locale="qDateLocale"
                      first-day-of-week="1" minimal no-unset mask="DD.MM.YYYY"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Datum auswählen" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import moment from 'moment'
import {useFilterStore} from 'stores/filter-store'

const filterStore = useFilterStore()
const {activeFilters} = storeToRefs(filterStore)

const defaultTimeSpans = [
  {name: 'today', lable: 'Heute', start: moment(), end: moment()},
  {name: 'this_week', lable: 'Diese Woche', start: moment(), end: moment().add(7, 'days')},
  {name: 'this_month', lable: 'Diesen Monat', start: moment(), end: moment().add(30, 'days')},
]

const setTimeSpan = (timeSpan) => {
  filterStore.activeFilters.events.startDate = moment(timeSpan.start).format("DD.MM.YYYY")
  filterStore.activeFilters.events.endDate = moment(timeSpan.end).format("DD.MM.YYYY")
}

const qDateLocale = {
  days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
}

const isActiveTimeSpan = (timeSpan) => {
  const sameStart = filterStore.activeFilters.events.startDate === moment(timeSpan.start).format("DD.MM.YYYY")
  const sameEnd = filterStore.activeFilters.events.endDate === moment(timeSpan.end).format("DD.MM.YYYY")
  return sameStart && sameEnd
}

onMounted(() => {
    setTimeSpan(defaultTimeSpans[1])
})

</script>
<style lang="scss">
.q-chip--active {
  background: var(--brandColor);
  color: var(--contrastTextColor);
}
</style>
