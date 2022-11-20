<template>
  <div class="row justify-center text-h5 q-mt-lg q-mb-xs">
    Zeitraum einschränken
  </div>
  <div class="row justify-center q-mb-sm">
    <q-chip v-for="timeSpan in defaultTimeSpans">
      {{ timeSpan.title }}
    </q-chip>
  </div>
  <div class="row q-gutter-md justify-center">

    <q-input v-for="spanBoundary in Object.keys(customTimeSpan)"
             v-model="customTimeSpan[spanBoundary].date"
             :label="customTimeSpan[spanBoundary].title"
             dense filled clearable mask="##.##.####"
    >
      <!--             :rules="customTimeSpan[spanBoundary].date ? ['date']: null"-->
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">

            <q-date v-model="customTimeSpan[spanBoundary].date" :locale="qDateLocale"
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
</template>
<script setup>
import {reactive} from 'vue'

const defaultTimeSpans = [
  {title: 'Heute'},
  {title: 'Diese Woche'},
  {title: 'Diesen Monat'}
]

const customTimeSpan = reactive({
  start: {title: 'Zeitraum von', date: null},
  end: {title: 'Zeitraum bis', date: null},
})

const qDateLocale = {
  days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
}
</script>
