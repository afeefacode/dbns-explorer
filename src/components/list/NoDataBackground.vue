<template>
  <div class="no-data-background">
    <div class="q-mt-xl q-mb-lg" style="font-size: 1.3rem;">
      Nicht das richtige gefunden? <br>
      Hilf mit unseren nachhaltigen Datenschatz zu erweitern!
    </div>
    <!--    <div style="font-size: 1.1em" class="q-mb-sm">-->
    <!--      Probier es doch mal mit einer dieser Abfragen:-->
    <!--    </div>-->
    <!--    <div class="q-mb-xl">-->
    <!--      <a href="">Veranstaltungen zum Thema Nachhaltiger Konsum in Leipzig</a> <br>-->
    <!--      oder <br>-->
    <!--      <a href="">Akteure im Bereich Bildung und Forschung in Dresden</a>-->
    <!--    </div>-->
    <div class="q-mb-lg">
      <div style="font-size: 1.1rem;">
        Registriere dich und mach dein Engagement sichtbar
      </div>
      <a href="https://daten.nachhaltiges-sachsen.de/registrieren" target="_blank">Account registrieren</a> <br>
      <a href="https://daten.nachhaltiges-sachsen.de/admin/" target="_blank">Direkt zum Login</a>
    </div>
    <div class="q-mb-xl">
      <div style="font-size: 1.1rem;" class="q-mb-md">Spread the word</div>
      <div class="share-icons">
        <q-icon name="facebook"/>
        <q-icon name="whatsapp"/>
        <q-icon name="telegram"/>
        <q-icon name="email"/>
      </div>
    </div>
    <div class="credits">
      Dies ist ein Projekt des
      <LvnsLogoLink/>
    </div>
  </div>

</template>
<script setup>
import LvnsLogoLink from 'components/list/LvnsLogoLink.vue'
</script>
<style lang="scss" scoped>
.no-data-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #444;

  text-align: center;

  .share-icons {
    display: flex;
    justify-content: center;
    gap: 2em;

    .q-icon {
      scale: 2;
      color: #999;
      cursor: pointer;


      &:hover {
        color: var(--brandColor)
      }
    }
  }

  .credits {
    display: flex;
    flex-direction: column;
    color: #999;
    margin-top: 2em;
  }
}
</style>
