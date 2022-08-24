<template>
  <q-layout view="lHh Lpr lFf">
    <q-img src="../img/lvns-background.png"/>
    <q-page-container class="page-container">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>
<style>
.page-container {
  max-width: 1170px;
  margin: auto;
}
</style>
