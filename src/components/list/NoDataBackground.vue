<template>
  <div class="no-data-background">
    <div class="q-mt-xl q-mb-xl" style="font-size: 1.4rem;">
      Nicht das richtige gefunden? <br>
      Hilf mit unseren nachhaltigen Datenschatz zu erweitern!
    </div>
    <div class="q-mb-md">
      <div>
        Registriere dich und mach dein Engagement sichtbar!
      </div>
      <a href="https://daten.nachhaltiges-sachsen.de/registrieren" target="_blank">Account registrieren</a> <br>
      <a href="https://daten.nachhaltiges-sachsen.de/admin/" target="_blank">Direkt zum Login</a>
    </div>

<!--    <div class="q-mb-xl">-->
<!--      <div class="q-mb-md">Spread the word</div>-->
<!--      <div class="share-icons">-->
<!--        <q-icon name="facebook"/>-->
<!--        <q-icon name="whatsapp"/>-->
<!--        <q-icon name="telegram"/>-->
<!--        <q-icon name="email"/>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="q-mt-xl q-mb-sm" style="font-size: 1.4rem;">-->
<!--      Probleme oder Anregungen zum Projekt?-->
<!--    </div>-->
<!--    <div class="q-mb-md">-->
<!--      <div>-->
<!--        Schreib uns per Mail an <a href="mailto:kontakt@wo.de">?@?.de</a>-->
<!--      </div>-->
<!--    </div>-->

    <div class="credits" v-if="!isInIframe()">
      Dies ist ein Projekt des
      <LvnsLogoLink/>
    </div>
  </div>

</template>
<script setup>
import {isInIframe} from 'src/utils'
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
    margin-top: 2em;
  }
}
</style>
