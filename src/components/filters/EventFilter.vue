<template>
  <q-input filled v-model="date" mask="date" :rules="['date']">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">

          <q-date v-model="date" :locale="qDateLocale" first-day-of-week="1">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>

        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>

<!--  <q-date-->
<!--    v-model="date"-->
<!--    minimal-->
<!--    :locale="qDateLocale"-->
<!--  />-->


</template>
<script setup>
import {ref} from 'vue'

const date = ref(null)

const qDateLocale = {
  days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
  daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
}
</script>
