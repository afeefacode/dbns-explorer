<template>
  <div class="row justify-center text-h5 q-mb-sm">
    Zeitraum einschränken
  </div>
  <div class="row justify-center q-mb-sm">
    <q-chip v-for="timeSpan in defaultTimeSpans">
      {{ timeSpan.title }}
    </q-chip>
  </div>
  <div class="row q-gutter-md justify-center">
    <q-input filled v-model="customTimeSpan[spanBoundary].date" mask="date" :rules="['date']"
             :label="customTimeSpan[spanBoundary].title" v-for="spanBoundary in Object.keys(customTimeSpan)">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">

            <q-date v-model="date" :locale="qDateLocale" first-day-of-week="1">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-date>

          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>

  <!--  <q-date-->
  <!--    v-model="date"-->
  <!--    minimal-->
  <!--    :locale="qDateLocale"-->
  <!--  />-->

</template>
<script setup>
import {ref, reactive} from 'vue'

const defaultTimeSpans = [
  {title: 'Heute'},
  {title: 'Diese Woche'},
  {title: 'Diesen Monat'}
]

const customTimeSpan = reactive({
  start: {title: 'Zeitraum von', date: null},
  end: {title: 'Zeitraum bis', date: null},
})

const date = ref(null)

const qDateLocale = {
  days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
}
</script>
