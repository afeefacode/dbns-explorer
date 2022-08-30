<template>
  <div class="q-gutter-sm row q-mb-lg">
    <q-checkbox v-model="all" label="Alle Typen anzeigen" color="primary"/>
    <div class="no-wrap">
      <q-checkbox v-model="actors" label="Akteure" color="primary"/>
      <q-checkbox v-model="projects" label="Projekte" color="primary"/>
      <q-checkbox v-model="events" label="Veranstaltungen" color="primary"/>
    </div>
  </div>
  <div class="q-gutter-sm row q-mb-lg">
    <q-select
      filled
      v-model="regionsRef"
      dense
      :options="regionNames"
      label="Region wählen..."
      class="col-xs-12 col-sm-3"
    >
      <template v-slot:prepend>
        <q-icon name="filter_alt"/>
      </template>
    </q-select>

    <q-select
      filled
      v-model="categoriesRef"
      dense
      :options="categorieNames"
      label="Kategorie wählen..."
      class="col-xs-12 col-sm-3"
    >
      <template v-slot:prepend>
        <q-icon name="filter_alt"/>
      </template>
    </q-select>

    <q-input
      filled
      dense
      v-model="text"
      label="Stichwortsuche"
      class="col-xs-12 col-sm-3"
    >
      <template v-slot:prepend>
        <q-icon name="search"/>
      </template>
    </q-input>

  </div>
</template>
<script setup>
import {ref} from 'vue'
import {categories} from '../assets/categories'
import {regions} from '../assets/regions'

const all = ref(true)
const actors = ref(false)
const projects = ref(false)
const events = ref(true)

const regionsRef = ref(null)
const categoriesRef = ref(null)

const categorieNames = categories.map(category => category.name)
const regionNames = regions.map(region => region.name)


</script>
