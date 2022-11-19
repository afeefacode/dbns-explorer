<template>
<div class="q-ma-md">
  <q-skeleton type="QBtn" class="q-mb-md"/>
  <q-card class="detail-card">
    <div class="row q-mb-md">
      <q-skeleton type="text" class="col-3"/>
    </div>
    <div class="row q-mb-md" style="height: 50px">
      <q-skeleton type="text" class="col-8"/>
    </div>
    <div v-for="i in 3" class="row flex-center" style="display: flex; justify-content: flex-start; height: 30px;">
      <q-skeleton type="circle" style="scale: .5" class="q-mr-xl"/>
      <q-skeleton type="text" class="col-3"/>
    </div>
  </q-card>
  <div class="q-ma-lg">
    <div class="row" style="height: 70px">
      <q-skeleton type="text" class="col-8"/>
    </div>
    <div class="q-mb-lg">
      <div v-for="i in 10" class="row">
        <q-skeleton type="text" :class="`col-${9 + Math.floor(Math.random()* 4)}`"/>
      </div>
    </div>
    <div class="row q-mb-md" style="height: 50px">
      <q-skeleton type="text" class="col-3"/>
    </div>
    <div v-for="i in 2" class="row q-gutter-lg q-mb-lg" style="height: 200px">
      <q-skeleton v-for="i in 2" type="rect" class="col-12 col-sm-5"/>
    </div>
  </div>
</div>
</template>
